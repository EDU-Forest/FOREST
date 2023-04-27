package com.ssafy.forestworkbook.service;

import com.ssafy.forestworkbook.dto.workbook.TeacherWorkbookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;

public interface WorkbookService {

    Page<TeacherWorkbookDto> getTeacherWorkbookList(Long userId, String sort, Pageable pageable);

}