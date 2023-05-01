package com.ssafy.forestworkbook.controller;

import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookTitleDto;
import com.ssafy.forestworkbook.service.WorkbookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Api("Workbook Controller")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/workbook")
public class WorkbookController {

    private final WorkbookService workbookService;

    @GetMapping
    @ApiOperation(value = "선생님 문제 페이지 문제집 목록 조회", notes = "문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getTeacherWorkbookList(
            @RequestParam("search") String search, Pageable pageable) {
//        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Long userId = Long.valueOf(10);
        return workbookService.getTeacherWorkbookList(userId, search, pageable);
    }

    @PostMapping("/{workbookId}")
    @ApiOperation(value = "문제집 사본 만들기", notes = "문제집 사본을 만듭니다.")
    public ResponseSuccessDto<?> copyWorkbook(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(10);
        return workbookService.copyWorkbook(userId, workbookId);
    }

    @PostMapping
    @ApiOperation(value = "문제집 생성하기", notes = "새로운 문제집을 생성합니다.")
    public ResponseSuccessDto<?> createWorkbook(@RequestBody WorkbookTitleDto workbookTitleDto) {
        Long userId = Long.valueOf(9);
        return workbookService.createWorkbook(userId, workbookTitleDto);
    }


}
