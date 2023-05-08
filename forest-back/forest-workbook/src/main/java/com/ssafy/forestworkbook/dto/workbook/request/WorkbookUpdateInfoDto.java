package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

import java.util.List;

@Getter
public class WorkbookUpdateInfoDto {

    private WorkbookDetailDto workbookInfo;
    private List<ProblemOrderDto> problemList;

}
