package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.memo.*;
import com.ssafy.forestauth.service.MemoService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api("Memo Controller V1")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/memo")
public class MemoController {

    private final MemoService memoService;

    // 메모 조회
    @GetMapping("")
    public ResponseEntity<ResponseSuccessDto<List<SelectMemoResponseDto>>> selectMemo(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(memoService.selectMemo(userId));
    }

    // 메모 생성
    @PostMapping("")
    public ResponseEntity<ResponseSuccessDto<SaveMemoResponseDto>> saveMemo(
            @RequestBody @Valid SaveMemoRequestDto saveMemoRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(memoService.saveMemo(userId, saveMemoRequestDto));
    }

    // 메모 삭제
    @PatchMapping("")
    public ResponseEntity<ResponseSuccessDto<DeleteMemoResponseDto>> deleteMemo(
            @RequestBody @Valid DeleteMemoRequestDto deleteMemoRequestDto
    ) {
        return ResponseEntity.ok(memoService.deleteMemo(deleteMemoRequestDto));
    }

}
