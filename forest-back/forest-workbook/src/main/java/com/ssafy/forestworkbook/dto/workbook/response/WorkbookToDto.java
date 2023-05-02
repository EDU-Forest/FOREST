package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class WorkbookToDto {

    private WorkbookInfoDto workbookInfoDto;
    private List<ProblemAllInfoDto> problemList;

    @Builder
    public WorkbookToDto(WorkbookInfoDto workbookInfoDto, List<ProblemAllInfoDto> problemList) {
        this.workbookInfoDto = workbookInfoDto;
        this.problemList = problemList;
    }
}
