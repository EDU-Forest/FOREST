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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @ApiOperation(value = "(학생) 문항별 정답 여부 조회", notes = "(학생) 문항별 정답 여부를 조회합니다.")
    @GetMapping("/student/result/question/{studyId}/{userId}")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetStudentResultQuestionResponseDto>>>> getStudentResultQuestion(@PathVariable("studyId") Long studyId, @PathVariable("userId") Long userId) {
        return ResponseEntity.ok(studyService.getStudentResultQuestion(studyId, userId));
    }

    @ApiOperation(value = "(학생) 시험 결과 조회", notes = "(학생) 시험 결과를 조회합니다.")
    @GetMapping("/student/result/{studyId}/{userId}")
    public ResponseEntity<ResponseSuccessDto<GetStudentResultResponseDto>> getStudentResult(@PathVariable("studyId") Long studyId, @PathVariable("userId") Long userId) {
        return ResponseEntity.ok(studyService.getStudentResult(studyId, userId));
    }

    @ApiOperation(value = "(학생) 최근 진행한 문제집 성적 조회", notes = "(학생) 최근 진행한 문제집 성적을 조회합니다.")
    @GetMapping("/student/recent/{classId}/{userId}")
    public ResponseEntity<ResponseSuccessDto<GetStudentRecentResponseDto>> getStudentRecent(@PathVariable("classId") Long classId, @PathVariable("userId") Long userId) {
        return ResponseEntity.ok(studyService.getStudentRecent(classId, userId));
    }

    @ApiOperation(value = "(학생) 선택한 문제집 성적 조회", notes = "(학생) 선택한 문제집 성적을 조회합니다.")
    @GetMapping("/student/{studyId}/{userId}")
    public ResponseEntity<ResponseSuccessDto<?>> getStudentWorkbookResult(@PathVariable("studyId") Long studyId, @PathVariable("userId") Long userId) {
        return ResponseEntity.ok(studyService.getStudentWorkbookResult(studyId, userId));
    }

    @ApiOperation(value = "시험 전체 문제 목록 조회", notes = "시험 전체 문제 목록을 조회합니다.")
    @GetMapping("/problem/{studyId}")
    public ResponseEntity<ResponseSuccessDto<GetProblemResponseDto>> getProblemListAll(@PathVariable("studyId") Long studyId, @PathVariable("userId") Long userId) {
        return ResponseEntity.ok(studyService.getProblemListAll(studyId,userId));
    }

    @ApiOperation(value = "시험 시작하기", notes = "시험을 시작합니다.")
    @PostMapping("/start")
    public ResponseEntity<ResponseSuccessDto<PostStartStudyResponseDto>> PostStartStudy(@RequestBody @Valid PostStartStudyRequestDto postStartStudyRequestDto) {
        return ResponseEntity.ok(studyService.PostStartStudy(postStartStudyRequestDto));
    }

//    @ApiOperation(value = "다음 문제 이동하기", notes = "다음 문제로 이동합니다.")
//    @PatchMapping("/problem")
//    public ResponseEntity<ResponseSuccessDto<PostStartStudyResponseDto>> PostStartStudy(@RequestBody @Valid PostStartStudyRequestDto postStartStudyRequestDto) {
//        return ResponseEntity.ok(studyService.PostStartStudy(postStartStudyRequestDto));
//    }
}
