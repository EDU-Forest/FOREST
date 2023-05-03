package com.ssafy.forestworkbook.service;

import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.ProblemUpdateInfoDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookTitleDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookUpdateInfoDto;
import org.springframework.data.domain.Pageable;

public interface WorkbookService {

    ResponseSuccessDto<?> getTeacherWorkbookList(Long userId, String sort, Pageable pageable);
    ResponseSuccessDto<?> getClassWorkbook(Long userID, Long classId, String search);
    ResponseSuccessDto<?> getWorkbookAllInfo(Long userId, Long workbookId);
    ResponseSuccessDto<?> createWorkbook(Long userId, WorkbookTitleDto workbookTitleDto);
    ResponseSuccessDto<?> updateWorkbook(Long userId, WorkbookUpdateInfoDto workbookUpdateInfoDto);
    ResponseSuccessDto<?> deleteWorkbook(Long userId, Long workbookId);
    ResponseSuccessDto<?> changeWorkbookIsPublic(Long userId, Long workbookId);
    ResponseSuccessDto<?> checkExportRange(Long userId, Long workbookId);
    ResponseSuccessDto<?> delpoyWorkbook(Long userId, Long workbookId);
    ResponseSuccessDto<?> copyWorkbook(Long userId, Long workbookId);
    ResponseSuccessDto<?> updateProblem(Long userId, ProblemUpdateInfoDto problemUpdateInfoDto);
    ResponseSuccessDto<?> createBookmark(Long userId, Long workbookId, boolean isNew);
    ResponseSuccessDto<?> deleteBookmark(Long userId, Long workbookId);
    ResponseSuccessDto<?> getBestWorkbook(Long userId, String search);
    ResponseSuccessDto<?> getRecentWorkbook(Long userId);
    ResponseSuccessDto<?> getEditorWorkbook(Long userId);

}