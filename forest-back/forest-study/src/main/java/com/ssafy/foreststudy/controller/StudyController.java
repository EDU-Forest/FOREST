package com.ssafy.foreststudy.controller;

import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.GetScheduleResponseDto;
import com.ssafy.foreststudy.dto.study.GetStudyRecentResponseDto;
import com.ssafy.foreststudy.service.StudyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Api("Study 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/study")
public class StudyController {

    private final StudyService studyService;

    @ApiOperation(value = "클래스 일정 목록 조회", notes = "클래스의 일정 목록을 조회합니다.")
    @GetMapping("/calendar/{classId}")
    //public ResponseEntity<ResponseSuccessDto<List<GetScheduleResponseDto>>> getScheduleList(@PathVariable("classId") Long classId) {
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetScheduleResponseDto>>>> getScheduleList(@PathVariable("classId") Long classId) {
        return ResponseEntity.ok(studyService.getScheduleList(classId));
    }

    @ApiOperation(value = "최근 진행한 시험 정보 조회", notes = "최근 진행한 시험 정보를 조회합니다.")
    @GetMapping("/recent/{classId}")
    public ResponseEntity<ResponseSuccessDto<GetStudyRecentResponseDto>> getStudyRecent(@PathVariable("classId") Long classId) {
        return ResponseEntity.ok(studyService.getStudyRecent(classId));
    }
}
