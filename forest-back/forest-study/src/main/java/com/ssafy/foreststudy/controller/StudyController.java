package com.ssafy.foreststudy.controller;

import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.*;
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

    @ApiOperation(value = "최근 진행한 클래스 시험 결과 조회", notes = "최근 진행한 클래스 시험 결과를 조회합니다.")
    @GetMapping("/recent/{classId}")
    public ResponseEntity<ResponseSuccessDto<GetStudyRecentResponseDto>> getStudyRecent(@PathVariable("classId") Long classId) {
        return ResponseEntity.ok(studyService.getStudyRecent(classId));
    }

    @ApiOperation(value = "시험 결과 조회", notes = "클릭한 클래스 시험 결과를 조회합니다.")
    @GetMapping("/{studyId}")
    public ResponseEntity<ResponseSuccessDto<?>> getStudyResult(@PathVariable("studyId") Long studyId) {
        return ResponseEntity.ok(studyService.getStudyResult(studyId));
    }

    @ApiOperation(value = "(클래스) 문항별 정답률 조회", notes = "(클래스) 문항별 정답률을 조회합니다.")
    @GetMapping("/class/result/question/{studyId}")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetStudyResultQuestionResponseDto>>>> getStudyResultQuestion(@PathVariable("studyId") Long studyId) {
        return ResponseEntity.ok(studyService.getStudyResultQuestion(studyId));
    }

    @ApiOperation(value = "(클래스) 전체 정답률 조회", notes = "(클래스) 전체 정답률을 조회합니다.")
    @GetMapping("/class/result/all/{studyId}")
    public ResponseEntity<ResponseSuccessDto<GetStudyResultAllResponseDto>> getStudyResultAll(@PathVariable("studyId") Long studyId) {
        return ResponseEntity.ok(studyService.getStudyResultAll(studyId));
    }

    @ApiOperation(value = "(클래스) 응시자별 성취도 조회", notes = "(클래스) 응시자별 성취도를 조회합니다.")
    @GetMapping("/class/result/student/{studyId}")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetStudyResultStudentResponseDto>>>> getStudyResultStudent(@PathVariable("studyId") Long studyId) {
        return ResponseEntity.ok(studyService.getStudyResultStudent(studyId));
    }

    @ApiOperation(value = "(개인) 문항별 정답 여부 조회", notes = "(개인) 문항별 정답 여부를  조회합니다.")
    @GetMapping("/student/result/question/{studyId}")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetStudentResultQuestionResponseDto>>>> getStudentResultQuestion(@PathVariable("studyId") Long studyId) {
        return ResponseEntity.ok(studyService.getStudentResultQuestion(studyId));
    }
}
