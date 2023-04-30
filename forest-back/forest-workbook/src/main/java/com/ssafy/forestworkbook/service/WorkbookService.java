package com.ssafy.forestworkbook.service;

import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookTitleDto;
import org.springframework.data.domain.Pageable;

public interface WorkbookService {

    ResponseSuccessDto<?> getTeacherWorkbookList(Long userId, String sort, Pageable pageable);

    ResponseSuccessDto<?> copyWorkbook(Long userId, Long workbookId);

    ResponseSuccessDto<?> createWorkbook(Long userId, WorkbookTitleDto workbookTitleDto);
}