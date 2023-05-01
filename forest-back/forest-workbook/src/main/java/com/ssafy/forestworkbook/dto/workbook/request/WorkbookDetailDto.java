package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

@Getter
public class WorkbookDetailDto {

    private Long workbookId;
    private String title;
    private Long workbookImgId;
    private String description;

}
