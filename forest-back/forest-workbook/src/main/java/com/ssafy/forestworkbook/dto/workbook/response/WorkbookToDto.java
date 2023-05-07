package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class WorkbookToDto {

    private WorkbookInfoDto workbookInfo;
    private List<ProblemAllInfoDto> problemList;

    @Builder
    public WorkbookToDto(WorkbookInfoDto workbookInfo, List<ProblemAllInfoDto> problemList) {
        this.workbookInfo = workbookInfo;
        this.problemList = problemList;
    }
}
