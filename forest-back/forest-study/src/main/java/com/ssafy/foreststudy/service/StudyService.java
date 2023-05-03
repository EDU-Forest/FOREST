package com.ssafy.foreststudy.service;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.*;
import com.ssafy.foreststudy.entity.*;
import com.ssafy.foreststudy.enumeration.EnumProblemTypeStatus;
import com.ssafy.foreststudy.enumeration.response.SuccessCode;
import com.ssafy.foreststudy.errorhandling.exception.StudyErrorCode;
import com.ssafy.foreststudy.repository.*;
import com.ssafy.foreststudy.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StudyService {

    private final ResponseUtil responseUtil;
    private final StudyRepository studyRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final ClassStudyResultRepository classStudyResultRepository;
    private final ClassAnswerRateRepository classAnswerRateRepository;
    private final StudentStudyResultRepository studentStudyResultRepository;
    private final StudentStudyProblemResultRepository studentStudyProblemResultRepository;
    private final ProblemListRepository problemListRepository;
    private final ItemRepository itemRepository;
    private final ClassUserRepository classUserRepository;

    /* duplicate Extract */
    private GetStudyRecentResponseDto getStudyInfoResponse(ClassStudyResult cs, String schedule) {
        GetStudyRecentResponseDto getStudyRecentResponseDto = GetStudyRecentResponseDto.builder()
                .studyId(cs.getStudy().getId())
                .title(cs.getStudy().getName())
                .startTime(cs.getStudy().getStartTime())
                .endTime(cs.getStudy().getEndTime())
                .userName(cs.getStudy().getUser().getName())
                .studyType(cs.getStudy().getType().toString())
                .scheduleType(schedule)
                .studyCreatedDate(cs.getStudy().getCreatedDate())
                .workbookCreatedDate(cs.getStudy().getWorkbook().getCreatedDate())
                .volume(cs.getStudy().getWorkbook().getVolume())
                .isPublic(cs.getStudy().getWorkbook().getIsPublic())
                .average(cs.getAverage())
                .standardDeviation(cs.getStandardDeviation())
                .averageSolvingTime(cs.getAverageSolvingTime())
                .totalStudent(cs.getTotalStudent())
                .participantStudent(cs.getParticipantStudent())
                .takeRate(cs.getTakeRate())
                .build();

        return getStudyRecentResponseDto;
    }

    /* duplicate Extract */
    private String getScheduleType(ClassStudyResult cs) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = cs.getStudy().getStartTime();
        LocalDateTime endTime = cs.getStudy().getEndTime();
        String schedule = null;
        if (now.isBefore(startTime)) {
            schedule = "BEFORE";
        } else if (now.isAfter(endTime)) {
            schedule = "AFTER";
        } else {
            schedule = "ONGOING";
        }

        return schedule;
    }

    /* duplicate Extract */
    private GetStudentRecentResponseDto GetStudentStudyResult(User user, ClassStudyResult cs, String schedule) {
        StudentStudyResult ssr = studentStudyResultRepository.findAllByStudyAndUser(cs.getStudy(), user)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));

        List<StudentStudyProblemResult> ssp = studentStudyProblemResultRepository.findAllByStudyAndUser(cs.getStudy(), user);
        int totalScore = 0;
        int percentage = 0;
        for (StudentStudyProblemResult studentStudyProblemResult : ssp) {
            totalScore += studentStudyProblemResult.getProblemList().getProblem().getPoint();
        }
        if (totalScore != 0) {
            percentage = ssr.getScore() * 100 / totalScore;
        }

        Duration duration = Duration.between(ssr.getEnterTime(), ssr.getExitTime());
        GetStudentScoreResponseDto student = GetStudentScoreResponseDto.builder()
                .totalScore(totalScore)
                .studentScore(ssr.getScore())
                .percentage(percentage)
                .correctNum(ssr.getCorrectNum())
                .solvingTime(duration.getSeconds() / 60)
                .build();


        GetClassScoreResponseDto classScore = GetClassScoreResponseDto.builder()
                .average(cs.getAverage())
                .standardDeviation(cs.getStandardDeviation())
                .averageSolvingTime(cs.getAverageSolvingTime())
                .build();
        GetStudentRecentResponseDto result = GetStudentRecentResponseDto.builder()
                .studyId(cs.getStudy().getId())
                .title(cs.getStudy().getName())
                .startTime(cs.getStudy().getStartTime())
                .endTime(cs.getStudy().getEndTime())
                .userName(cs.getStudy().getUser().getName())
                .studyType(cs.getStudy().getType().toString())
                .scheduleType(schedule)
                .studentResult(student)
                .classResult(classScore)
                .build();

        return result;
    }

    /* 대시보드 일정(캘린더) 목록 조회 */
    public ResponseSuccessDto<Map<String, List<GetScheduleResponseDto>>> getScheduleList(Long userId) {

//        classRepository.findById(classId)
//                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_NOT_FOUND));
        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        List<ClassUser> classUser = classUserRepository.findAllByUser(user);

        List<Study> studyList = new ArrayList<>();
        for (ClassUser cu : classUser) {
            classRepository.findById(cu.getId())
                    .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_NOT_FOUND));
            List<Study> classStudyList = studyRepository.findAllListByClassId(cu.getId());
            studyList.addAll(classStudyList);
        }


        System.out.println("studyList = " + studyList);

        Map<String, List<GetScheduleResponseDto>> result = new HashMap<>();
        result.put("studyList", new ArrayList<>());
        //List<GetScheduleResponseDto> result = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        System.out.println("now = " + now);
        for (Study study : studyList) {
            LocalDateTime startTime = study.getStartTime();
            LocalDateTime endTime = study.getEndTime();
            String schedule = null;
            if (now.isBefore(startTime)) {
                schedule = "BEFORE";
            } else if (now.isAfter(endTime)) {
                if (ChronoUnit.DAYS.between(endTime, now) > 3)
                    continue;
                schedule = "AFTER";
            } else {
                schedule = "ONGOING";
            }

            GetScheduleResponseDto getScheduleResponseDto = GetScheduleResponseDto.builder()
                    .studyId(study.getId())
                    .title(study.getName())
                    .startTime(study.getStartTime())
                    .endTime(study.getEndTime())
                    .className(study.getClasses().getName())
                    .studyType(study.getType().toString())
                    .scheduleType(schedule)
                    .build();
            //result.add(getScheduleResponseDto);
            result.get("studyList").add(getScheduleResponseDto);
        }

        /* scheduleType 기준으로 ONGOING/BEFORE/AFTER 정렬 */
        Collections.sort(result.get("studyList"),
                Comparator.comparing(GetScheduleResponseDto::getScheduleType,
                                Comparator.comparing(type -> {
                                    if (type.equals("ONGOING")) return 1;
                                    if (type.equals("BEFORE")) return 2;
                                    if (type.equals("AFTER")) return 3;
                                    return 4;
                                }))
                        .thenComparing((a, b) -> {
                            if (a.getScheduleType().equals("ONGOING") && b.getScheduleType().equals("ONGOING")) {
                                return a.getEndTime().compareTo(b.getEndTime());
                            } else if (a.getScheduleType().equals("BEFORE") && b.getScheduleType().equals("BEFORE")) {
                                return a.getStartTime().compareTo(b.getStartTime());
                            } else if (a.getScheduleType().equals("AFTER") && b.getScheduleType().equals("AFTER")) {
                                return b.getEndTime().compareTo(a.getEndTime());
                            } else {
                                return 0;
                            }
                        })
        );


        //ResponseSuccessDto<List<GetScheduleResponseDto>> res = responseUtil.successResponse(result, ForestStatus.STUDY_SUCCESS_CALENDAR);
        ResponseSuccessDto<Map<String, List<GetScheduleResponseDto>>> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_CALENDAR);
        return res;
    }

    /* 최근 진행한 시험 결과 조회 */
    public ResponseSuccessDto<GetStudyIdResponseDto> getStudyRecent(Long classId) {
        classRepository.findById(classId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_NOT_FOUND));

        List<ClassStudyResult> csList = classStudyResultRepository.findTop1ByClassIdOrderByEndTime(classId);

        if(csList.isEmpty()) {
            return responseUtil.successResponse("", SuccessCode.STUDY_NONE_RECENT);
        }

        ClassStudyResult cs = csList.get(0);

        String schedule = getScheduleType(cs);

        // GetStudyRecentResponseDto getStudyRecentResponseDto = getStudyInfoResponse(cs, schedule);
        GetStudyIdResponseDto getStudyRecentResponseDto = GetStudyIdResponseDto.builder()
                .studyId(cs.getStudy().getId())
                .build();
        ResponseSuccessDto<GetStudyIdResponseDto> res = responseUtil.successResponse(getStudyRecentResponseDto, SuccessCode.STUDY_SUCCESS_RECENT);

        return res;
    }

    /* 시험 결과 조회(클릭 시) */
    public ResponseSuccessDto<?> getStudyResult(Long studyId) {

        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        ClassStudyResult cs = classStudyResultRepository.findAllByStudy(study).orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_RESULT_NOT_FOUND));

        String schedule = getScheduleType(cs);
        ResponseSuccessDto<GetStudyRecentResponseDto> res = null;
        if (schedule.equals("BEFORE") || schedule.equals("ONGOING")) {
            //GetStudyBeforeAndOngoingResponseDto getStudyBeforeAndOngoingResponseDto = GetStudyBeforeAndOngoingResponseDto.builder()
            GetStudyBeforeAndOngoingResponseDto getStudyBeforeAndOngoingResponseDto = GetStudyBeforeAndOngoingResponseDto.builder()
                    .studyId(cs.getStudy().getId())
                    .title(cs.getStudy().getName())
                    .startTime(cs.getStudy().getStartTime())
                    .endTime(cs.getStudy().getEndTime())
                    .userName(cs.getStudy().getUser().getName())
                    .studyType(cs.getStudy().getType().toString())
                    .scheduleType(schedule)
                    .build();
            res = responseUtil.successResponse(getStudyBeforeAndOngoingResponseDto, SuccessCode.STUDY_SUCCESS_INFO_BEFORE);
        } else {
            GetStudyRecentResponseDto getStudyRecentResponseDto = getStudyInfoResponse(cs, schedule);
            res = responseUtil.successResponse(getStudyRecentResponseDto, SuccessCode.STUDY_SUCCESS_INFO_AFTER);
        }


        return res;
    }

    /* (클래스) 문항별 정답률 조회 */
    public ResponseSuccessDto<Map<String, List<GetStudyResultQuestionResponseDto>>> getStudyResultQuestion(Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        List<ClassAnswerRate> ca = classAnswerRateRepository.findAllByStudyOrderByProblemListAsc(study);
        Map<String, List<GetStudyResultQuestionResponseDto>> result = new HashMap<>();
        result.put("classAnswerRateList", new ArrayList<>());
        for (ClassAnswerRate classAnswerRate : ca) {
            int incorrect = 100 - classAnswerRate.getCorrectRate() - classAnswerRate.getUngradedRate();

            GetStudyResultQuestionResponseDto getStudyResultQuestionResponseDtoList = GetStudyResultQuestionResponseDto.builder()
                    .problemNum(classAnswerRate.getProblemList().getProblemNum())
                    .correctRate(classAnswerRate.getCorrectRate())
                    .incorrectRate(incorrect)
                    .ungradedRate(classAnswerRate.getUngradedRate())
                    .build();
            result.get("classAnswerRateList").add(getStudyResultQuestionResponseDtoList);
        }

        ResponseSuccessDto<Map<String, List<GetStudyResultQuestionResponseDto>>> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RESULT_QUESTION);
        return res;
    }

    /* (클래스) 전체 정답률 조회 */
    public ResponseSuccessDto<GetStudyResultAllResponseDto> getStudyResultAll(Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        ClassStudyResult cs = classStudyResultRepository.findAllByStudy(study).orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_RESULT_NOT_FOUND));

        int incorrect = 100 - cs.getCorrectAnswerRate() - cs.getUngradedAnswerRate();

        GetStudyResultAllResponseDto result = GetStudyResultAllResponseDto.builder()
                .correctAnswerRate(cs.getCorrectAnswerRate())
                .incorrectAnswerRate(incorrect)
                .ungradedAnswerRate(cs.getUngradedAnswerRate())
                .build();

        ResponseSuccessDto<GetStudyResultAllResponseDto> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RESULT_ALL);
        return res;
    }

    /* (클래스) 응시자별 성취도 조회 */
    public ResponseSuccessDto<Map<String, List<GetStudyResultStudentResponseDto>>> getStudyResultStudent(Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        List<StudentStudyResult> ssr = studentStudyResultRepository.findAllByStudy(study);
        Map<String, List<GetStudyResultStudentResponseDto>> result = new HashMap<>();
        result.put("studentStudyResultList", new ArrayList<>());

        for (StudentStudyResult studentStudyResult : ssr) {
            GetStudyResultStudentResponseDto getStudyResultQuestionResponseDtoList = GetStudyResultStudentResponseDto.builder()
                    .name(studentStudyResult.getUser().getName())
                    .email(studentStudyResult.getUser().getEmail())
                    .enterTime(studentStudyResult.getEnterTime())
                    .exitTime(studentStudyResult.getExitTime())
                    .correctNum(studentStudyResult.getCorrectNum())
                    .correctRate(studentStudyResult.getCorrectRate())
                    .build();

            result.get("studentStudyResultList").add(getStudyResultQuestionResponseDtoList);
        }

        ResponseSuccessDto<Map<String, List<GetStudyResultStudentResponseDto>>> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RESULT_ACHIEVEMENT);
        return res;
    }

    /* (개인) 문항별 정답 여부 조회 */
    public ResponseSuccessDto<Map<String, List<GetStudentResultQuestionResponseDto>>> getStudentResultQuestion(Long studyId, Long userId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        List<StudentStudyProblemResult> ssr = studentStudyProblemResultRepository.findAllByStudyAndUser(study, user);
        Map<String, List<GetStudentResultQuestionResponseDto>> result = new HashMap<>();
        result.put("studentStudyProblemResultList", new ArrayList<>());

        for (StudentStudyProblemResult studentStudyProblemResult : ssr) {
            GetStudentResultQuestionResponseDto getStudyResultQuestionResponseDtoList = GetStudentResultQuestionResponseDto.builder()
                    .problemNum(studentStudyProblemResult.getProblemList().getProblemNum())
                    .isCorrected(studentStudyProblemResult.getIsCorrected())
                    .build();

            result.get("studentStudyProblemResultList").add(getStudyResultQuestionResponseDtoList);
        }

        ResponseSuccessDto<Map<String, List<GetStudentResultQuestionResponseDto>>> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RESULT_QUESTION_USER);
        return res;
    }

    /* (개인) 시험 결과 조회 */
    public ResponseSuccessDto<GetStudentResultResponseDto> getStudentResult(Long studyId, Long userId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        StudentStudyResult cs = studentStudyResultRepository.findAllByStudyAndUser(study, user).orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));

        Duration duration = Duration.between(cs.getEnterTime(), cs.getExitTime());

        GetStudentResultResponseDto result = GetStudentResultResponseDto.builder()
                .score(cs.getScore())
                .correctNum(cs.getCorrectNum())
                .solvingTime(duration.getSeconds() / 60) // 소요 풀이 시간 분 단위로 보냄
                .correctRate(cs.getCorrectRate())
                .isGraded(cs.getIsGraded())
                .volume(cs.getStudy().getWorkbook().getVolume())
                .startTime(cs.getStudy().getStartTime())
                .endTime(cs.getStudy().getEndTime())
                .build();

        ResponseSuccessDto<GetStudentResultResponseDto> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RESULT_ALL);
        return res;
    }

    /* (학생) 최근 진행한 문제집 성적 조회 */
    public ResponseSuccessDto<GetStudyIdResponseDto> getStudentRecent(Long classId, Long userId) {

        classRepository.findById(classId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        List<ClassStudyResult> csList = classStudyResultRepository.findTop1ByClassIdAndUserIdOrderByEndTime(classId, userId);
        if (csList.size() == 0)
            return responseUtil.successResponse("", SuccessCode.STUDY_NONE_RECENT);

        ClassStudyResult cs = csList.get(0);
        String schedule = getScheduleType(cs);

        //GetStudentRecentResponseDto result = GetStudentStudyResult(user, cs, schedule);
        GetStudyIdResponseDto result = GetStudyIdResponseDto.builder()
                .studyId(cs.getStudy().getId())
                .build();
        ResponseSuccessDto<GetStudyIdResponseDto> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RECENT);

        return res;
    }

    /* (학생) 선택한 문제집 성적 조회 */
    public ResponseSuccessDto<?> getStudentWorkbookResult(Long studyId, Long userId) {

        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        ClassStudyResult cs = classStudyResultRepository.findAllByStudy(study)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_RESULT_NOT_FOUND));

        String schedule = getScheduleType(cs);


        if (schedule.equals("BEFORE") || schedule.equals("ONGOING")) {
            GetStudyBeforeAndOngoingResponseDto getStudyBeforeAndOngoingResponseDto = GetStudyBeforeAndOngoingResponseDto.builder()
                    .studyId(cs.getStudy().getId())
                    .title(cs.getStudy().getName())
                    .startTime(cs.getStudy().getStartTime())
                    .endTime(cs.getStudy().getEndTime())
                    .userName(cs.getStudy().getUser().getName())
                    .studyType(cs.getStudy().getType().toString())
                    .scheduleType(schedule)
                    .build();
            return responseUtil.successResponse(getStudyBeforeAndOngoingResponseDto, SuccessCode.STUDY_SUCCESS_INFO_BEFORE);
        } else {
            GetStudentRecentResponseDto result = GetStudentStudyResult(user, cs, schedule);

            return responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_INFO_AFTER);
        }
    }

    /* 시험 문제 전체 목록 조회 */
    public ResponseSuccessDto<GetProblemResponseDto> getProblemListAll(Long studyId, Long userId) {
        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        List<ProblemList> problemList = problemListRepository.findAllByWorkbookOrderByProblemNumAsc(study.getWorkbook());
        List<GetProblemListResponseDto> problem = new ArrayList<>();
        for (ProblemList pl : problemList) {
            List<Item> itemList = itemRepository.findAllByProblem(pl.getProblem());
            List<GetItemListResponseDto> item = new ArrayList<>();

            for (Item it : itemList) {
                item.add(GetItemListResponseDto.builder()
                        .itemId(it.getId())
                        .no(it.getNo())
                        .content(it.getContent())
                        .isImage(it.getIsImage())
                        .build());
            }

            /* 개인 시험 결과 문제 ID 가져오기 위함 */
            StudentStudyProblemResult spr = studentStudyProblemResultRepository.findAllByStudyAndUserAndProblemList(study, user, pl)
                    .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));


            problem.add(GetProblemListResponseDto.builder()
                    .studentStudyProblemId(spr.getId())
                    .problemNum(pl.getProblemNum())
                    .type(pl.getProblem().getType())
                    .title(pl.getProblem().getTitle())
                    .text(pl.getProblem().getText())
                    .problemImgPath(pl.getProblem().getPath())
                    .userAnswer(spr.getUserAnswer())
                    .problemAnswer(pl.getProblem().getAnswer())
                    .item(item)
                    .build());
        }

        GetProblemResponseDto result = GetProblemResponseDto.builder()
                .volume(study.getWorkbook().getVolume())
                .startTime(study.getStartTime())
                .endTime(study.getEndTime())
                .problem(problem)
                .build();

        return responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_PROBLEM_LIST);
    }

    /* 시험 시작하기 */
    public ResponseSuccessDto<PostResponseDto> postStartStudy(@Valid PostStartStudyRequestDto postStartStudyRequestDto) {

        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(postStartStudyRequestDto.getStudyId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(postStartStudyRequestDto.getUserId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        /* 해당 유저 클래스 회원이 아닌 경우 체크 */
        classUserRepository.findAllByClassesAndUser(study.getClasses(), user)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_IN_CLASS));

        /* 재입장 여부 체크 */
        Optional<StudentStudyResult> ssr = studentStudyResultRepository.findAllByStudyAndUser(study, user);
        if (ssr.isPresent())
            throw new CustomException(StudyErrorCode.STUDY_STUDENT_ENTER);



        /* 개인시험 결과 테이블 생성 */
        StudentStudyResult studentStudyResult = new StudentStudyResult();
        studentStudyResult.createStudentStudyResult(study, user);
        studentStudyResultRepository.save(studentStudyResult);


        /* 개인시험 결과_문제 테이블 생성 */
        Workbook workbook = study.getWorkbook();
        List<ProblemList> problemLists = problemListRepository.findAllByWorkbookOrderByProblemNumAsc(workbook);
        for (ProblemList problemList : problemLists) {
            StudentStudyProblemResult studentStudyProblemResult = new StudentStudyProblemResult();
            studentStudyProblemResult.createStudentStudyProblemResult(study, user, problemList);
            studentStudyProblemResultRepository.save(studentStudyProblemResult);
        }

        PostResponseDto postResponseDto = PostResponseDto.builder()
                .message("개인 시험 결과 문제 생성 완료")
                .build();

        ResponseSuccessDto<PostResponseDto> res = responseUtil.successResponse(postResponseDto, SuccessCode.STUDY_SAVE_STUDENT_PROBLEM_RESULT);
        return res;
    }

    /* 다음 문제 이동하기 */
    public ResponseSuccessDto<PatchResponseDto> patchNextProblem(@Valid PatchNextProblemRequestDto patchNextProblemRequestDto) {

        /* 존재하지 않는 개인 시험 문제 ID 체크 */
        StudentStudyProblemResult spr = studentStudyProblemResultRepository.findById(patchNextProblemRequestDto.getStudentStudyProblemId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_PROBLEM_NOT_FOUND));

        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(patchNextProblemRequestDto.getStudyId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(patchNextProblemRequestDto.getUserId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        /* 서술형이라면 */
        if (patchNextProblemRequestDto.getType().equals(EnumProblemTypeStatus.DESCRIPT)) {
            // 코사인 유사도 분석 코드 추가 예정
            /*  키워드 포함 개수 분석 코드 -> 서술형 채점 부분으로 옮길 것
                String getAnswer = spr.getProblemList().getProblem().getAnswer();
                String[] keyWords = getAnswer.split(",");
                for (String keyWord : keyWords) {
                    int num = 0;
                    if(patchNextProblemRequestDto.getUserAnswer().contains(keyWord)){
                        num++;
                    }
                }
            */


            spr.updateStudentStudyProblemResult(patchNextProblemRequestDto.getUserAnswer(), 0, false, false);
        } else {
            /* 정답이 맞을 때 */
            if (patchNextProblemRequestDto.getUserAnswer().equals(spr.getProblemList().getProblem().getAnswer())) {
                int partPoint = spr.getProblemList().getProblem().getPoint();
                spr.updateStudentStudyProblemResult(patchNextProblemRequestDto.getUserAnswer(), partPoint, true, true);
            } else {
                spr.updateStudentStudyProblemResult(patchNextProblemRequestDto.getUserAnswer(), 0, false, true);
            }
        }

        PatchResponseDto patchNextProblemResponseDto = PatchResponseDto.builder()
                .message("문제 답안 저장 완료")
                .build();

        ResponseSuccessDto<PatchResponseDto> res = responseUtil.successResponse(patchNextProblemResponseDto, SuccessCode.STUDY_SUCCESS_UPDATE_PROBLEM_RESULT);
        return res;
    }

    /* 시험 종료하기 */
    public ResponseSuccessDto<PatchResponseDto> patchExitStudy(@Valid PatchExitStudyRequestDto patchExitStudyRequestDto) {

        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(patchExitStudyRequestDto.getStudyId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(patchExitStudyRequestDto.getUserId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        /* 존재하지 않는 개인 시험 결과 ID 체크 */
        StudentStudyResult ssr = studentStudyResultRepository.findAllByStudyAndUser(study, user)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));

        /* 존재하지 않는 개인 시험 문제 ID 체크 */
        List<StudentStudyProblemResult> spr = studentStudyProblemResultRepository.findAllByStudyAndUser(study, user);

        int correctNum = 0;
        int scoreSum = 0;
        int correctRate = 0;
        boolean check = true;

        for (StudentStudyProblemResult ssp : spr) {
            if (ssp.getIsCorrected())
                correctNum++;

            if (!ssp.getIsGraded())
                check = false;

            scoreSum += ssp.getPartPoint();
        }

        if (spr.size() != 0)
            correctRate = correctNum * 100 / spr.size();

        ssr.updateStudentStudyResult(correctNum, scoreSum, correctRate, check);

        PatchResponseDto patchExitStudyResponseDto = PatchResponseDto.builder()
                .message("시험 종료")
                .build();

        ResponseSuccessDto<PatchResponseDto> res = responseUtil.successResponse(patchExitStudyResponseDto, SuccessCode.STUDY_SAVE_STUDENT_RESULT);
        return res;
    }

    /* (선생님) 서술형 문제 채점 목록 조회 */
    public ResponseSuccessDto<GetDescriptionListResponseDto> getDescriptionList(Long studyId) {

        /*
            1. 시험의 문제집 ID로 문제 목록 불러오기
            2. 문제 목록 리스트에서 문제 타입이 '서술형' 이면 따로 저장
            3. 스터디 ID와 문제 목록 ID로 학생 문제 답안 리스트 가져오기
            4. 키워드 가져와서 유사도 분석하기
            5. 값 추출
         */

        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));


        List<ProblemList> problemList = problemListRepository.findAllByWorkbookAndProblemType(study.getWorkbook());

        if (problemList == null)
            return responseUtil.successResponse("", SuccessCode.STUDY_SUCCESS_RESULT_DESCRIPT_LIST);


        List<GetDescriptionResponseDto> descript = new ArrayList<>();

        for (ProblemList list : problemList) {
            List<GetKeywordListResponseDto> keywordList = new ArrayList<>();
            String getAnswer = list.getProblem().getAnswer();
            String[] keyWords = getAnswer.split(",");

            // 키워드 리스트
            for (String keyWord : keyWords) {
                keywordList.add(GetKeywordListResponseDto.builder()
                        .keyword(keyWord)
                        .build());
            }

            // 학생 답안 리스트
            List<StudentStudyProblemResult> ssr = studentStudyProblemResultRepository.findAllByStudyAndProblemListOrderByIdAsc(study, list);
            List<GetStudentAnswerListResponseDto> studentList = new ArrayList<>();

            if (problemList == null)
                return responseUtil.successResponse("", SuccessCode.STUDY_SUCCESS_RESULT_DESCRIPT_LIST);

            int index = 1;
            for (StudentStudyProblemResult studentStudyProblemResult : ssr) {
                // 키워드 포함 개수 분석 코드
                int num = 0;
                for (String keyWord : keyWords) {
                    if (studentStudyProblemResult.getUserAnswer().contains(keyWord))
                        num++;

                }
                String userAnswer = studentStudyProblemResult.getUserAnswer();
                String workbookAnswer =
                        studentStudyProblemResult.getProblemList().getProblem().getAnswer();

                // WebClient로 Flask 통신
                GetJaccardSimilarityResponseDto similarity = WebClient.create("http://127.0.0.1:5000")
                        .get()
                        .uri("/similarity?sentence1=" + userAnswer + "&sentence2=" + workbookAnswer)
                        .retrieve()
                        .bodyToMono(GetJaccardSimilarityResponseDto.class)
                        .block();
                assert similarity != null;
                System.out.println(similarity.getSimilarity());

                studentList.add(GetStudentAnswerListResponseDto.builder()
                        .studentNum(index)
                        .answer(userAnswer)
                        //.similarity(getJaccardSimilarity(userAnswer,workbookAnswer)) //유사도 체크 로직
                        .sameNum(num)
                        .build());

                index++;
            }

            descript.add(GetDescriptionResponseDto.builder()
                    .problemListId(list.getId())
                    .title(list.getProblem().getTitle())
                    .point(list.getProblem().getPoint())
                    .keywordNum(keyWords.length)
                    .keywordList(keywordList)
                    .studentList(studentList)
                    .build());

        }

        GetDescriptionListResponseDto result = GetDescriptionListResponseDto.builder()
                .count(problemList.size())
                .descript(descript)
                .build();

        return responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RESULT_DESCRIPT_LIST);
    }

    /* (선생님) 서술형 문제 채점 */
    public ResponseSuccessDto<PatchResponseDto> patchDescription(@Valid PatchDescriptionListRequestDto patchDescriptionListRequestDto) {

        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(patchDescriptionListRequestDto.getStudyId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        /* 존재하지 않는 문제 목록 ID 체크 */
        ProblemList problemList = problemListRepository.findById(patchDescriptionListRequestDto.getProblemListId())
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_PROBLEM_LIST_NOT_FOUND));

        // 학생 답안 리스트
        List<StudentStudyProblemResult> ssp = studentStudyProblemResultRepository.findAllByStudyAndProblemListOrderByIdAsc(study, problemList);

        int size = patchDescriptionListRequestDto.getStudentPointList().size();

        /* 받은 답안 리스트 개수와 학생의 수가 일치하는지 체크 */
        if (size != ssp.size())
            throw new CustomException(StudyErrorCode.STUDY_FAILURE_DESCRIPT);

        // 총 문항 수 -> 정답률 계산 위해서
        int volume = study.getWorkbook().getVolume();

        int index = 0;
        int numOfCorrectStudent = 0;
        for (StudentStudyProblemResult studentStudyProblemResult : ssp) {
            int partPoint = patchDescriptionListRequestDto.getStudentPointList().get(index).getScore();
            boolean isCorrected = partPoint == patchDescriptionListRequestDto.getPoint();
            if (isCorrected)
                numOfCorrectStudent++;
            studentStudyProblemResult.updateDescript(partPoint, isCorrected, true);
            index++;

            /* 존재하지 않는 개인 시험 결과 ID 체크 */
            StudentStudyResult ssr = studentStudyResultRepository.findAllByStudyAndUser(study, studentStudyProblemResult.getUser())
                    .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));

            int correctNum = ssr.getCorrectNum();
            int scoreSum = ssr.getScore() + partPoint;

            if (isCorrected)
                correctNum++;
            int correctRate = correctNum * 100 / volume;
            boolean isGraded = patchDescriptionListRequestDto.getIsLast();
            ssr.updateStudentStudyResult(correctNum, scoreSum, correctRate, isGraded);

        }

        /* 반 문항별 정답율 업데이트 */
        ClassAnswerRate classAnswerRate = classAnswerRateRepository.findAllByStudyAndProblemList(study, problemList)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));

        classAnswerRate.updateClassAnswerRate(numOfCorrectStudent * 100 / ssp.size(), 0);

        /* 채점 완료 시 시험 결과 리포트 업데이트 하기 */
        if (patchDescriptionListRequestDto.getIsLast()) {

            List<StudentStudyResult> studentStudyResults = studentStudyResultRepository.findAllByStudy(study);

            int participateNum = studentStudyResults.size();
            int sumScore = 0;
            int correctRate = 0;
            for (StudentStudyResult ssr : studentStudyResults) {
                sumScore += ssr.getScore();
                correctRate += ssr.getCorrectRate();
            }
            double average = sumScore * 1.0 / participateNum;
            double dis = 0;
            for (StudentStudyResult ssr : studentStudyResults)
                dis += Math.pow(average - ssr.getScore(), 2);

            double standardDeviation = Math.sqrt(dis / participateNum);
            int correctAnswerRate = correctRate / participateNum;

            ClassStudyResult classStudyResult = classStudyResultRepository.findAllByStudy(study)
                    .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_CLASS_RESULT_NOT_FOUND));
            classStudyResult.updateClassAnswerRate(study, average, standardDeviation, correctAnswerRate);
        }

        PatchResponseDto patchResponseDto = PatchResponseDto.builder()
                .message("서술형 문제 채점 성공")
                .build();

        ResponseSuccessDto<PatchResponseDto> res = responseUtil.successResponse(patchResponseDto, SuccessCode.STUDY_SAVE_DESCRIPT);
        return res;
    }

    /* (클래스) 시험 종료하기 */
    public ResponseSuccessDto<PostResponseDto> postExitStudy(Long studyId) {

        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        List<ProblemList> problemList = problemListRepository.findAllByWorkbookOrderByProblemNumAsc(study.getWorkbook());

        /* 서술형 문항 개수 */
        int descriptNum = 0;

        /* 반 문항별 정답률 테이블 생성 */
        for (ProblemList list : problemList) {
            int correctNum = 0;
            List<StudentStudyProblemResult> studentStudyProblemResult = studentStudyProblemResultRepository.findAllByStudyAndProblemListOrderByIdAsc(study, list);
            for (StudentStudyProblemResult studyProblemResult : studentStudyProblemResult) {
                if (studyProblemResult.getIsCorrected())
                    correctNum++;
            }
            int correctRate = correctNum * 100 / studentStudyProblemResult.size();
            ClassAnswerRate classAnswerRate = new ClassAnswerRate();
            classAnswerRate.createClassAnswerRate(study, list, correctRate, 100 - correctRate);
            classAnswerRateRepository.save(classAnswerRate);
            if (list.getProblem().getType().equals(EnumProblemTypeStatus.DESCRIPT))
                descriptNum++;

        }

        List<ClassUser> classUser = classUserRepository.findAllByClasses(study.getClasses());
        List<StudentStudyResult> studentStudyResults = studentStudyResultRepository.findAllByStudy(study);

        int participateNum = studentStudyResults.size();
        int takeRate = participateNum * 100 / classUser.size();
        int sumScore = 0;
        long solvingTime = 0;
        int correctRate = 0;
        for (StudentStudyResult ssr : studentStudyResults) {
            sumScore += ssr.getScore();
            Duration duration = Duration.between(ssr.getEnterTime(), ssr.getExitTime());
            solvingTime += duration.getSeconds() / 60;
            correctRate += ssr.getCorrectRate();
        }
        double average = sumScore * 1.0 / participateNum;
        double dis = 0;
        for (StudentStudyResult ssr : studentStudyResults)
            dis += Math.pow(average - ssr.getScore(), 2);

        double standardDeviation = Math.sqrt(dis / participateNum);
        long averageSolvingTime = solvingTime / participateNum;
        int correctAnswerRate = correctRate / participateNum;
        int volume = study.getWorkbook().getVolume();
        int ungradedAnswerRate = (volume - descriptNum) * 100 / volume;

        /* 반 시험 결과 리포트 테이블 생성 */
        ClassStudyResult classStudyResult = new ClassStudyResult();
        classStudyResult.createClassAnswerRate(study, takeRate, average, standardDeviation, averageSolvingTime, correctAnswerRate, ungradedAnswerRate, classUser.size(), participateNum);
        classStudyResultRepository.save(classStudyResult);

        PostResponseDto postResponseDto = PostResponseDto.builder()
                .message("학습 종료")
                .build();

        ResponseSuccessDto<PostResponseDto> res = responseUtil.successResponse(postResponseDto, SuccessCode.STUDY_SUCCESS_EXIT);
        return res;
    }

    /* 자카드 유사도 계산 로직 */
    public int getJaccardSimilarity(String s1, String s2) {
        // WebClient로 Flask 통신
        WebClient webClient = WebClient.builder()
                .baseUrl("http://127.0.0.1:5000")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        System.out.println("s1 = " + s1);
        System.out.println("s2 = " + s2);
        GetJaccardSimilarityResponseDto similarity = webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/similarity")
                        .queryParam("sentence1", s1)
                        .queryParam("sentence2", s2)
                        .build())
                .retrieve()
                .bodyToMono(GetJaccardSimilarityResponseDto.class)
                .block();

        return similarity.getSimilarity();
    }

    /* 시험 시작하기 정보 조회 */
    public ResponseSuccessDto<GetStudyInfoResponseDto> getStudyInfo(Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));

        GetStudyInfoResponseDto result = GetStudyInfoResponseDto.builder()
                .name(study.getUser().getName())
                .volume(study.getWorkbook().getVolume())
                .startTime(study.getStartTime())
                .endTime(study.getEndTime())
                .build();

        ResponseSuccessDto<GetStudyInfoResponseDto> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_INFO);
        return res;
    }
}