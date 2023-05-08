package com.ssafy.forestworkbook.service;

import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.ExecuteDto;
import com.ssafy.forestworkbook.dto.workbook.request.ProblemUpdateInfoDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookTitleDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookUpdateInfoDto;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface WorkbookService {

    ResponseSuccessDto<?> getTeacherWorkbookList(Long userId, String search, Pageable pageable);
    ResponseSuccessDto<?> getClassWorkbook(Long userID, Long classId, String search);
    ResponseSuccessDto<?> getWorkbookAllInfo(Long userId, Long workbookId);
    ResponseSuccessDto<?> getWorkbookImg();
    ResponseSuccessDto<?> createWorkbook(Long userId, WorkbookTitleDto workbookTitleDto);
    ResponseSuccessDto<?> updateWorkbook(Long userId, WorkbookUpdateInfoDto workbookUpdateInfoDto);
    ResponseSuccessDto<?> deleteWorkbook(Long userId, Long workbookId);
    ResponseSuccessDto<?> changeWorkbookIsPublic(Long userId, Long workbookId);
    ResponseSuccessDto<?> executeWorkbook(Long userId, ExecuteDto executeDto);
    ResponseSuccessDto<?> checkExportRange(Long userId, Long workbookId);
    ResponseSuccessDto<?> deployWorkbook(Long userId, Long workbookId);
    ResponseSuccessDto<?> copyWorkbook(Long userId, Long workbookId);
    ResponseSuccessDto<?> updateProblem(Long userId, ProblemUpdateInfoDto problemUpdateInfoDto);
    ResponseSuccessDto<?> createProblemImg(Long userId, MultipartFile file) throws IOException;
    ResponseSuccessDto<?> deleteProblem(Long userId, Long problemId);
    ResponseSuccessDto<?> createBookmark(Long userId, Long workbookId, boolean isNew);
    ResponseSuccessDto<?> deleteBookmark(Long userId, Long workbookId);
    ResponseSuccessDto<?> scrapWorkbook(Long userId, Long workbookId);
    ResponseSuccessDto<?> getBestWorkbook(Long userId, String search);
    ResponseSuccessDto<?> getRecentWorkbook(Long userId);
    ResponseSuccessDto<?> getEditorWorkbook(Long userId);
    ResponseSuccessDto<?> searchEditorWorkbook(Long userId, String search);

}