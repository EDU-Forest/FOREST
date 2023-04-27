package com.ssafy.forestworkbook.controller;

import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api("Workbook Controller")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/workbook")
public class WorkbookController {

    private final WorkbookService workbookService;

    @GetMapping
    public ResponseEntity<ResponseSuccessDto<?>> getTeacherWorkbookList(
            @RequestParam("sort") String sort
    ) {


    }
}
