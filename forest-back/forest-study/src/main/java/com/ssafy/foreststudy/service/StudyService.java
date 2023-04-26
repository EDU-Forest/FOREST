package com.ssafy.foreststudy.service;

import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.GetScheduleResponseDto;
import com.ssafy.foreststudy.dto.study.GetStudyRecentResponseDto;
import com.ssafy.foreststudy.entity.Class;
import com.ssafy.foreststudy.entity.Study;
import com.ssafy.foreststudy.enumeration.response.ForestStatus;
import com.ssafy.foreststudy.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.foreststudy.repository.ClassRepository;
import com.ssafy.foreststudy.repository.StudyRepository;
import com.ssafy.foreststudy.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    /* 대시보드 일정(캘린더) 목록 조회 */
    public ResponseSuccessDto<Map<String, List<GetScheduleResponseDto>>> getScheduleList(Long classId) {

        classRepository.findById(classId)
                .orElseThrow(() -> new EntityIsNullException("해당 클래스가 존재하지 않습니다."));

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

        // scheduletype 기준으로 ONGOING/BEFORE/AFTER 정렬
//        Collections.sort(result.get("studyList"),
//                Comparator.comparing(GetScheduleResponseDto::getScheduleType,
//                        Comparator.comparing(type -> {
//                            if (type.equals("ONGOING")) return 1;
//                            if (type.equals("BEFORE")) return 2;
//                            if (type.equals("AFTER")) return 3;
//                            return 4;
//                        }))
//        );

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
        ResponseSuccessDto<Map<String, List<GetScheduleResponseDto>>> res = responseUtil.successResponse(result, ForestStatus.STUDY_SUCCESS_CALENDAR);
        return res;
    }

    public ResponseSuccessDto<GetStudyRecentResponseDto> getStudyRecent(Long classId) {
        classRepository.findById(classId)
                .orElseThrow(() -> new EntityIsNullException("해당 클래스가 존재하지 않습니다."));

        Study study = studyRepository.findAllByClassId(classId);

        GetStudyRecentResponseDto getStudyRecentResponseDto = GetStudyRecentResponseDto.builder()
                .studyId(study.getId())
                .title(study.getName())
                .startTime(study.getStartTime())
                .endTime(study.getEndTime())
                .userName(study.getUser().getName())
                .studyType(study.getType().toString())
                .studyCreatedDate(study.getCreatedDate())
                .workbookCreatedDate(study.getWorkbook().getCreatedDate())
                .volume(study.getWorkbook().getVolume())
                .isPublic(study.getWorkbook().getIsPublic())
                .build();

        ResponseSuccessDto<GetStudyRecentResponseDto> res = responseUtil.successResponse(getStudyRecentResponseDto, ForestStatus.STUDY_SUCCESS_RECENT);

        return res;
    }
}
