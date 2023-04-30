package com.ssafy.forestworkbook.dto.workbook;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class WorkbookCopyDto {

    private WorkbookInfo workbookInfo;
    private List<ProblemAllInfo> problemList;

    @Builder
    public WorkbookCopyDto(WorkbookInfo workbookInfo, List<ProblemAllInfo> problemList) {
        this.workbookInfo = workbookInfo;
        this.problemList = problemList;
    }
}
