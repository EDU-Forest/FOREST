package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

import java.util.List;

@Getter
public class ProblemUpdateInfoDto {

    private WorkbookDetailDto workbookInfo;
    private List<ProblemDto> problemList;

}
