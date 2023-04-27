package com.ssafy.forestworkbook.dto.workbook;

import lombok.*;

@Getter
@Builder
@ToString
public class TeacherWorkbookDto {

    private int workbookId;
    private String title;
    private String workbookImgPath;
    private int bookmarkCount;
    private int scrapCount;

}
