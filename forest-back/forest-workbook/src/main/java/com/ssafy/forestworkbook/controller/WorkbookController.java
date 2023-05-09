package com.ssafy.forestworkbook.controller;

import com.ssafy.forest.jwt.JwtDecoder;
import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.ExecuteDto;
import com.ssafy.forestworkbook.dto.workbook.request.ProblemUpdateInfoDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookTitleDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookUpdateInfoDto;
import com.ssafy.forestworkbook.service.WorkbookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

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
            HttpServletRequest request,
            @RequestParam String search, Pageable pageable) throws UnsupportedEncodingException{
//        JwtDecoder jwtDecoder = new JwtDecoder();
//        Long userId = jwtDecoder.verifyJWT(request);
//        log.info("{}", userId);
        Long userId = Long.valueOf(9);
        return workbookService.getTeacherWorkbookList(userId, search, pageable);
    }

    @GetMapping("/class/{classId}")
    @ApiOperation(value = "클래스 문제집 목록 조회", notes = "클래스 문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getClassWorkbook(
            HttpServletRequest request,
            @PathVariable Long classId, @RequestParam String search) throws UnsupportedEncodingException{
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        Long userId = Long.valueOf(9);
        return workbookService.getClassWorkbook(userId, classId, search);
    }

    @GetMapping("/{workbookId}")
    @ApiOperation(value = "문제집 상세 조회", notes = "문제집 전체 내용을 조회합니다.")
    public ResponseSuccessDto<?> getWorkbookAllInfo(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
        log.info("workbookID : {}", workbookId);
//        userId = Long.valueOf(1);
        return workbookService.getWorkbookAllInfo(userId, workbookId);
    }

    @GetMapping("/img")
    @ApiOperation(value = "문제집 이미지 목록 조회", notes = "문제집 이미지 목록을 조회합니다.")
    public ResponseSuccessDto<?> getWorkbookImg (HttpServletRequest request) throws UnsupportedEncodingException {
        return workbookService.getWorkbookImg();
    }

    @PostMapping
    @ApiOperation(value = "문제집 생성하기", notes = "새로운 문제집을 생성합니다.")
    public ResponseSuccessDto<?> createWorkbook(
            HttpServletRequest request,
            @RequestBody WorkbookTitleDto workbookTitleDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(1);
        return workbookService.createWorkbook(userId, workbookTitleDto);
    }

    @PatchMapping
    @ApiOperation(value = "문제집 순서 수정하기", notes = "문제집 정보와 문제 순서를 수정합니다.")
    public ResponseSuccessDto<?> updateWorkbook(
            HttpServletRequest request,
            @RequestBody WorkbookUpdateInfoDto workbookUpdateInfoDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(1);
        return workbookService.updateWorkbook(userId, workbookUpdateInfoDto);
    }

    @DeleteMapping("/{workbookId}")
    @ApiOperation(value = "문제집 삭제하기", notes = "문제집을 삭제합니다.")
    public ResponseSuccessDto<?> deleteWorkbook(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
        log.info("workbookID : {}", workbookId);
//        Long userId = Long.valueOf(9);
        return workbookService.deleteWorkbook(userId, workbookId);
    }

    @PatchMapping("/public/{workbookId}")
    @ApiOperation(value = "공개 여부 변경", notes = "내가 만든 문제집이면서 배포한 경우에 문제집 공개 범위를 수정할 수 있습니다.")
    public ResponseSuccessDto<?> changeWorkbookIsPublic(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
        log.info("workbookID : {}", workbookId);
//        userId = Long.valueOf(1);
        return workbookService.changeWorkbookIsPublic(userId, workbookId);
    }

    @GetMapping("/export/{workbookId}")
    @ApiOperation(value = "문제집 내보내기 가능 범위 확인", notes = "문제집 내보내기 가능 범위를 확인합니다. 내가 만든 문제집이 아닌 경우 배포 불가능합니다.")
    public ResponseSuccessDto<?> checkExportRange(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
        log.info("workbookID : {}", workbookId);
//        userId = Long.valueOf(1);
        return workbookService.checkExportRange(userId, workbookId);
    }

    @PostMapping("/export")
    @ApiOperation(value = "문제집 출제하기", notes = "문제집을 출제합니다.")
    public ResponseSuccessDto<?> executeWorkbook(
            HttpServletRequest request,
            @RequestBody ExecuteDto executeDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
//        Long userId = Long.valueOf(9);
        return workbookService.executeWorkbook(userId, executeDto);

    }

    @PatchMapping("/export/{workbookId}")
    @ApiOperation(value = "문제집 배포하기", notes = "내가 만든 문제집에 한해서 문제집을 배포합니다.")
    public ResponseSuccessDto<?> delpoyWorkbook(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
        log.info("workbookID : {}", workbookId);
//        userId = Long.valueOf(1);
        return workbookService.deployWorkbook(userId, workbookId);
    }

    @PostMapping("/{workbookId}")
    @ApiOperation(value = "문제집 사본 만들기", notes = "문제집 사본을 만듭니다.")
    public ResponseSuccessDto<?> copyWorkbook(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
        log.info("workbookID : {}", workbookId);
//        Long userId = Long.valueOf(10);
        return workbookService.copyWorkbook(userId, workbookId);
    }

    @PostMapping("/problem")
    @ApiOperation(value = "문제 만들기 및 수정하기", notes = "문제를 만들고 수정합니다.")
    public ResponseSuccessDto<?> updateProblem(
            HttpServletRequest request,
            @RequestBody ProblemUpdateInfoDto problemUpdateInfoDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("userID : {}", userId);
//        Long userId = Long.valueOf(9);
        return workbookService.updateProblem(userId, problemUpdateInfoDto);
    }

    @PostMapping ("/problem/img")
    @ApiOperation(value = "문제 이미지 등록하기", notes = "문제 이미지를 등록합니다.")
    public ResponseSuccessDto<?> createProblemImg(
            HttpServletRequest request,
            @RequestPart(value = "file") MultipartFile file) throws UnsupportedEncodingException, IOException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        Long userId = Long.valueOf(9);
        return workbookService.createProblemImg(userId, file);
    }

    @PostMapping ("/ocr/img")
    @ApiOperation(value = "이미지 ocr", notes = "이미지를 대상으로 OCR을 실시합니다.")
    public ResponseSuccessDto<?> ocrImg(
            HttpServletRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) throws UnsupportedEncodingException, IOException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
        log.info("{}", file.isEmpty());
//        Long userId = Long.valueOf(9);
        return workbookService.ocrImg(userId, file);
    }

    @PostMapping ("/ocr/pdf")
    @ApiOperation(value = "pdf ocr", notes = "pdf를 대상으로 OCR을 실시합니다.")
    public ResponseSuccessDto<?> ocrPdf (
            HttpServletRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) throws UnsupportedEncodingException, IOException, Exception {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
        log.info("{}", file.isEmpty());
//        Long userId = Long.valueOf(9);
        return workbookService.detectDocumentsGcs(file);
    }

    @DeleteMapping ("/problem/{problemId}")
    @ApiOperation(value = "문제 삭제하기", notes = "문제를 삭제합니다.")
    public ResponseSuccessDto<?> updateProblem(
            HttpServletRequest request,
            @PathVariable Long problemId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        Long userId = Long.valueOf(9);
        return workbookService.deleteProblem(userId, problemId);
    }

    @PostMapping("/bookmark/{workbookId}")
    @ApiOperation(value = "북마크 추가", notes = "해당 문제집에 스크랩, 북마크 이력이 없는 경우에 북마크를 추가합니다.")
    public ResponseSuccessDto<?> createNewBookmark(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(1);
        return workbookService.createBookmark(userId, workbookId, true);
    }

    @PatchMapping("/bookmark/{workbookId}")
    @ApiOperation(value = "북마크 추가", notes = "해당 문제집에 스크랩, 북마크 이력이 있는 경우에 북마크를 추가합니다.")
    public ResponseSuccessDto<?> updateNewBookmark(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(10);
        return workbookService.createBookmark(userId, workbookId, false);
    }

    @DeleteMapping("/bookmark/{workbookId}")
    @ApiOperation(value = "북마크 삭제", notes = "북마크를 삭제합니다.")
    public ResponseSuccessDto<?> deleteNewBookmark(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(10);
        return workbookService.deleteBookmark(userId, workbookId);
    }

    @PostMapping("scrap/{workbookId}")
    @ApiOperation(value = "문제집 스크랩", notes = "문제집을 스크랩합니다.")
    public ResponseSuccessDto<?> scrapWorkbook(
            HttpServletRequest request,
            @PathVariable Long workbookId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(1);
        return workbookService.scrapWorkbook(userId, workbookId);
    }

    @GetMapping("/best")
    @ApiOperation(value = "최고 인기 문제집 목록 조회", notes = "최고 인기 문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getBestWorkbook(
            HttpServletRequest request,
            @RequestParam String search) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(9);
        return workbookService.getBestWorkbook(userId, search);
    }

    @GetMapping("/recent")
    @ApiOperation(value = "최신 문제집 목록 조회", notes = "최신 문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getRecentWorkbook(HttpServletRequest request) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(9);
        return workbookService.getRecentWorkbook(userId);
    }

    @GetMapping("/editor")
    @ApiOperation(value = "에디터 페이지 문제집 목록 조회", notes = "내가 만든 문제집 목록을 조회합니다.")
    public ResponseSuccessDto<?> getEditorWorkbook(HttpServletRequest request) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        userId = Long.valueOf(3);
        return workbookService.getEditorWorkbook(userId);
    }

    @GetMapping("/explore")
    @ApiOperation(value = "에디터 페이지 문제집 검색", notes = "문제집을 검색합니다.")
    public ResponseSuccessDto<?> searchEditorWorkbook(
            HttpServletRequest request,
            @RequestParam String search) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        log.info("{}", userId);
//        Long userId = Long.valueOf(9);
        return workbookService.searchEditorWorkbook(userId, search);
    }
}
