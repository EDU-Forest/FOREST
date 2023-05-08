package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

import java.util.List;

@Getter
public class ProblemUpdateInfoDto {

    private Long workbookId;
    private List<ProblemDto> problemList;
    private List<ItemIdDto> deleteItemList;

}
