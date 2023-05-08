package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ExploreWorkbookListkDto {

    private List<ExploreWorkbookDto> workbookList;

    public ExploreWorkbookListkDto(List<ExploreWorkbookDto> workbookList) {
        this.workbookList = workbookList;
    }
}
