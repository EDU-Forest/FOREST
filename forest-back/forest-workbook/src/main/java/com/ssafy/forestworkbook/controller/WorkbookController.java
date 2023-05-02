package com.ssafy.forestworkbook.controller;

import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.ProblemUpdateInfoDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookTitleDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookUpdateInfoDto;
import com.ssafy.forestworkbook.service.WorkbookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@Api("Workbook Controller")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/workbook")
public class WorkbookController {

    private final WorkbookService workbookService;

    // TODO UserID가 어떻게 올까?
    // TODO path -> MultipartFile file로 바꾸기
    @GetMapping
    @ApiOperation(value = "선생님 문제 페이지 문제집 목록 조회", notes = "문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getTeacherWorkbookList(
            @RequestParam("search") String search, Pageable pageable) {
//        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Long userId = Long.valueOf(10);
        return workbookService.getTeacherWorkbookList(userId, search, pageable);
    }

    @GetMapping("/{workbookId}")
    @ApiOperation(value = "문제집 상세 조회", notes = "문제집 전체 내용을 조회합니다.")
    public ResponseSuccessDto<?> getWorkbookAllInfo(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(10);
        return workbookService.getWorkbookAllInfo(userId, workbookId);
    }

    @PostMapping("/{workbookId}")
    @ApiOperation(value = "문제집 사본 만들기", notes = "문제집 사본을 만듭니다.")
    public ResponseSuccessDto<?> copyWorkbook(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(9);
        return workbookService.copyWorkbook(userId, workbookId);
    }

    @PatchMapping
    @ApiOperation(value = "문제 순서 수정하기", notes = "문제집 정보와 문제 순서를 수정합니다.")
    public ResponseSuccessDto<?> updateWorkbook(@RequestBody WorkbookUpdateInfoDto workbookUpdateInfoDto) {
        Long userId = Long.valueOf(9);
        return workbookService.updateWorkbook(userId, workbookUpdateInfoDto);
    }

    @PostMapping
    @ApiOperation(value = "문제집 생성하기", notes = "새로운 문제집을 생성합니다.")
    public ResponseSuccessDto<?> createWorkbook(@RequestBody WorkbookTitleDto workbookTitleDto) {
        Long userId = Long.valueOf(9);
        return workbookService.createWorkbook(userId, workbookTitleDto);
    }
    @PatchMapping("/problem")
    @ApiOperation(value = "문제 수정하기", notes = "문제를 수정합니다.")
    public ResponseSuccessDto<?> updateProblem(@RequestBody ProblemUpdateInfoDto problemUpdateInfoDto) {
        Long userId = Long.valueOf(9);
        return workbookService.updateProblem(userId, problemUpdateInfoDto);
    }

    @GetMapping("/export/{workbookId}")
    @ApiOperation(value = "문제집 내보내기 가능 범위 확인", notes = "문제집 내보내기 가능 범위를 확인합니다. 내가 만든 문제집이 아닌 경우 배포 불가능합니다.")
    public ResponseSuccessDto<?> checkExportRange(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(9);
        return workbookService.checkExportRange(userId, workbookId);
    }

    @PatchMapping("/export/{workbookId}")
    @ApiOperation(value = "문제집 배포하기", notes = "내가 만든 문제집에 한해서 문제집을 배포합니다.")
    public ResponseSuccessDto<?> delpoyWorkbook(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(9);
        return workbookService.delpoyWorkbook(userId, workbookId);
    }

    @PatchMapping("/public/{workbookId}")
    @ApiOperation(value = "공개 여부 변경", notes = "내가 만든 문제집이면서 배포한 경우에 문제집 공개 범위를 수정할 수 있습니다.")
    public ResponseSuccessDto<?> changeWorkbookIsPublic(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(10);
        return workbookService.changeWorkbookIsPublic(userId, workbookId);
    }

    @PostMapping("/bookmark/{workbookId}")
    @ApiOperation(value = "북마크 추가", notes = "해당 문제집에 스크랩, 북마크 이력이 없는 경우에 북마크를 추가합니다.")
    public ResponseSuccessDto<?> createNewBookmark(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(10);
        return workbookService.createBookmark(userId, workbookId, true);
    }

    @PatchMapping("/bookmark/{workbookId}")
    @ApiOperation(value = "북마크 추가", notes = "해당 문제집에 스크랩, 북마크 이력이 있는 경우에 북마크를 추가합니다.")
    public ResponseSuccessDto<?> updateNewBookmark(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(10);
        return workbookService.createBookmark(userId, workbookId, true);
    }

    @DeleteMapping("/bookmark/{workbookId}")
    @ApiOperation(value = "북마크 삭제", notes = "북마크를 삭제합니다.")
    public ResponseSuccessDto<?> deleteNewBookmark(@PathVariable Long workbookId) {
        Long userId = Long.valueOf(10);
        return workbookService.deleteBookmark(userId, workbookId);
    }

    @GetMapping("/best")
    @ApiOperation(value = "최고 인기 문제집 목록 조회", notes = "최고 인기 문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getBestWorkbook(@RequestParam("search") String search) {
        Long userId = Long.valueOf(10);
        return workbookService.getBestWorkbook(userId, search);
    }

    @GetMapping("/recent")
    @ApiOperation(value = "최신 문제집 목록 조회", notes = "최신 문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getRecentWorkbook() {
        Long userId = Long.valueOf(10);
        return workbookService.getRecentWorkbook(userId);
    }


}
