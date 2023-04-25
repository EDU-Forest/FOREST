package com.ssafy.foreststudy.service;

import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.GetScheduleResponseDto;
import com.ssafy.foreststudy.entity.Study;
import com.ssafy.foreststudy.enumeration.response.ForestStatus;
import com.ssafy.foreststudy.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.foreststudy.repository.ClassRepository;
import com.ssafy.foreststudy.repository.StudyRepository;
import com.ssafy.foreststudy.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StudyService {

    private final ResponseUtil responseUtil;
    private final StudyRepository studyRepository;
    private final ClassRepository classRepository;

    /* 대시보드 일정(캘린더) 목록 조회 */
    public ResponseSuccessDto<List<GetScheduleResponseDto>> getScheduleList(Long classId) {
        classRepository.findById(classId)
                .orElseThrow(() -> new EntityIsNullException("해당 클래스가 존재하지 않습니다."));

        List<Study> studyList = studyRepository.findAllByClassId(classId);
        List<GetScheduleResponseDto> result = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

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
                    .title(study.getName())
                    .startTime(study.getStartTime())
                    .endTime(study.getEndTime())
                    .className(study.getClasses().getName())
                    .studyType(study.getType().toString())
                    .scheduleType(schedule)
                    .build();
            result.add(getScheduleResponseDto);
        }
        ResponseSuccessDto<List<GetScheduleResponseDto>> res = responseUtil.successResponse(result, ForestStatus.STUDY_SUCCESS_CALENDAR);
        return res;
    }
}
