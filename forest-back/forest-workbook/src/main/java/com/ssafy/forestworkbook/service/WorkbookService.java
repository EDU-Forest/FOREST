package com.ssafy.forestworkbook.service;

import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.TeacherWorkbookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

public interface WorkbookService {

    ResponseSuccessDto<Page<TeacherWorkbookDto>> getTeacherWorkbookList(Long userId, String sort, Pageable pageable);

    ResponseSuccessDto<?> copyWorkbook(Long userId, Long workbookId);
}