package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.classes.*;
import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.SearchStudentResponseDto;
import com.ssafy.forestauth.service.ClassService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("Class Controller V1")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/class")
public class ClassController {

    private final ClassService classService;

    // 선생님, 학생 클래스 목록
    @GetMapping("")
    public ResponseEntity<ResponseSuccessDto<List<SelectClassResponseDto>>> selectClass(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(classService.selectClass(userId));
    }

    // 클래스 이름 중복 검사
    @GetMapping("/search")
    public ResponseEntity<ResponseSuccessDto<CheckClassResponseDto>> checkClassName(
            @RequestParam("className") String className
    ) {
        return ResponseEntity.ok(classService.checkClassName(className));
    }

    // 선생님 클래스 추가
    @PostMapping("")
    public ResponseEntity<ResponseSuccessDto<SaveClassResponseDto>> saveClass(
            @RequestBody SaveClassRequestDto saveClassRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(classService.saveClass(userId, saveClassRequestDto));
    }

    // 클래스에 학생 추가
    @PostMapping("/student")
    public ResponseEntity<ResponseSuccessDto<SaveClassStudentResponseDto>> saveClassStudent(
            @RequestBody SaveClassStudentRequestDto saveClassStudentRequestDto
    ) {
        return ResponseEntity.ok(classService.saveClassStudent(saveClassStudentRequestDto));
    }

    // 클래스에 속한 학생 목록 조회
    @GetMapping("/{classId}/student")
    public ResponseEntity<ResponseSuccessDto<List<SearchStudentResponseDto>>> searchStudent(
            @PathVariable("classId") Long classId
    ) {
        return ResponseEntity.ok(classService.searchStudent(classId));
    }

    // 클래스에서 학생 삭제
    @PatchMapping("/student")
    public ResponseEntity<ResponseSuccessDto<DeleteStudentResponseDto>> deleteStudent(
            @RequestBody DeleteStudentRequestDto deleteStudentRequestDto
    ) {
        return ResponseEntity.ok(classService.deleteStudent(deleteStudentRequestDto));
    }

    // 선생님 최근 생성 클래스 아이디 조회
    @GetMapping("/recent")
    public ResponseEntity<ResponseSuccessDto<RecentClassResponseDto>> searchRecentClass(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(classService.searchRecentClass(userId));
    }
}
