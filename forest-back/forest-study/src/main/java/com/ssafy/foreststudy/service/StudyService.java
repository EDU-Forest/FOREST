package com.ssafy.foreststudy.service;

import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.*;
import com.ssafy.foreststudy.entity.*;
import com.ssafy.foreststudy.enumeration.response.ErrorCode;
import com.ssafy.foreststudy.enumeration.response.SuccessCode;
import com.ssafy.foreststudy.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.foreststudy.repository.*;
import com.ssafy.foreststudy.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ProblemRepository problemRepository;
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
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));

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
    public ResponseSuccessDto<Map<String, List<GetScheduleResponseDto>>> getScheduleList(Long classId) {

        classRepository.findById(classId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_CLASS_NOT_FOUND));

        List<Study> studyList = studyRepository.findAllListByClassId(classId);

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
    public ResponseSuccessDto<GetStudyRecentResponseDto> getStudyRecent(Long classId) {
        classRepository.findById(classId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_CLASS_NOT_FOUND));

        List<ClassStudyResult> csList = classStudyResultRepository.findTop1ByClassIdOrderByEndTime(classId);
        ClassStudyResult cs = csList.get(0);

        if (cs == null)
            return responseUtil.successResponse("", SuccessCode.STUDY_NONE_RECENT);


        String schedule = getScheduleType(cs);

        GetStudyRecentResponseDto getStudyRecentResponseDto = getStudyInfoResponse(cs, schedule);
        ResponseSuccessDto<GetStudyRecentResponseDto> res = responseUtil.successResponse(getStudyRecentResponseDto, SuccessCode.STUDY_SUCCESS_RECENT);

        return res;
    }

    /* 시험 결과 조회(클릭 시) */
    public ResponseSuccessDto<?> getStudyResult(Long studyId) {

        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

        ClassStudyResult cs = classStudyResultRepository.findAllByStudy(study).orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_CLASS_RESULT_NOT_FOUND));

        String schedule = getScheduleType(cs);
        ResponseSuccessDto<GetStudyRecentResponseDto> res = null;
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
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

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
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

        ClassStudyResult cs = classStudyResultRepository.findAllByStudy(study).orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_CLASS_RESULT_NOT_FOUND));

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
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

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
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

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
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        StudentStudyResult cs = studentStudyResultRepository.findAllByStudyAndUser(study, user).orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_STUDENT_RESULT_NOT_FOUND));

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
    public ResponseSuccessDto<GetStudentRecentResponseDto> getStudentRecent(Long classId, Long userId) {

        classRepository.findById(classId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_CLASS_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        List<ClassStudyResult> csList = classStudyResultRepository.findTop1ByClassIdAndUserIdOrderByEndTime(classId, userId);
        if (csList.size() == 0)
            return responseUtil.successResponse("", SuccessCode.STUDY_NONE_RECENT);

        ClassStudyResult cs = csList.get(0);
        String schedule = getScheduleType(cs);

        GetStudentRecentResponseDto result = GetStudentStudyResult(user, cs, schedule);
        ResponseSuccessDto<GetStudentRecentResponseDto> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RECENT);

        return res;
    }

    /* (학생) 선택한 문제집 성적 조회 */
    public ResponseSuccessDto<?> getStudentWorkbookResult(Long studyId, Long userId) {

        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        ClassStudyResult cs = classStudyResultRepository.findAllByStudy(study)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_CLASS_RESULT_NOT_FOUND));

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
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        List<ProblemList> problemList = problemListRepository.findAllByWorkbook(study.getWorkbook());
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
            StudentStudyProblemResult spr = studentStudyProblemResultRepository.findAllByStudyAndUserAndProblemList(study,user,pl);

            problem.add(GetProblemListResponseDto.builder()
                    .studentStudyProblemId(spr.getId())
                    .problemNum(pl.getProblemNum())
                    .type(pl.getProblem().getType())
                    .title(pl.getProblem().getTitle())
                    .text(pl.getProblem().getText())
                    .problemImgPath(pl.getProblem().getPath())
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
    public ResponseSuccessDto<PostStartStudyResponseDto> PostStartStudy(@Valid PostStartStudyRequestDto postStartStudyRequestDto) {

        /* 존재하지 않는 스터디 ID 체크 */
        Study study = studyRepository.findById(postStartStudyRequestDto.getStudyId())
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.STUDY_NOT_FOUND));

        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(postStartStudyRequestDto.getUserId())
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        /* 해당 유저 클래스 회원이 아닌 경우 체크 */
        classUserRepository.findAllByClassesAndUser(study.getClasses(), user)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_IN_CLASS));

        /* 개인시험 결과 테이블 생성 */
        StudentStudyResult studentStudyResult = new StudentStudyResult();
        studentStudyResult.createStudentStudyResult(study, user);
        studentStudyResultRepository.save(studentStudyResult);


        /* 개인시험 결과_문제 테이블 생성 */
        Workbook workbook = study.getWorkbook();
        List<ProblemList> problemLists = problemListRepository.findAllByWorkbook(workbook);
        for (ProblemList problemList : problemLists) {
            StudentStudyProblemResult studentStudyProblemResult = new StudentStudyProblemResult();
            studentStudyProblemResult.createStudentStudyProblemResult(study, user, problemList);
            studentStudyProblemResultRepository.save(studentStudyProblemResult);
        }

        PostStartStudyResponseDto postStartStudyResponseDto = PostStartStudyResponseDto.builder()
                .message("개인 시험 결과 문제 생성 완료")
                .build();

        ResponseSuccessDto<PostStartStudyResponseDto> res = responseUtil.successResponse(postStartStudyResponseDto, SuccessCode.STUDY_SAVE_STUDENT_PROBLEM_RESULT);
        return res;
    }

}