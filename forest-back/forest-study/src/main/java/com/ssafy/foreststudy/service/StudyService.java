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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        ClassStudyResult cs = classStudyResultRepository.findAllByClassIdOrderByEndTime(classId);

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
                    .volume(cs.getStudy().getWorkbook().getVolume())
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
            GetStudyResultQuestionResponseDto getStudyResultQuestionResponseDtoList = GetStudyResultQuestionResponseDto.builder()
                    .problemNum(classAnswerRate.getProblemList().getProblemNum())
                    .correctRate(classAnswerRate.getCorrectRate())
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

        GetStudyResultAllResponseDto result = GetStudyResultAllResponseDto.builder()
                .correctAnswerRate(cs.getCorrectAnswerRate())
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

        List<StudentStudyProblemResult> ssr = studentStudyProblemResultRepository.findAllByStudyAndUser(study,user);
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
                .solvingTime(duration.getSeconds())
                .correctRate(cs.getCorrectRate())
                .volume(cs.getStudy().getWorkbook().getVolume())
                .startTime(cs.getStudy().getStartTime())
                .endTime(cs.getStudy().getEndTime())
                .build();

        ResponseSuccessDto<GetStudentResultResponseDto> res = responseUtil.successResponse(result, SuccessCode.STUDY_SUCCESS_RESULT_ALL);
        return res;
    }
}
