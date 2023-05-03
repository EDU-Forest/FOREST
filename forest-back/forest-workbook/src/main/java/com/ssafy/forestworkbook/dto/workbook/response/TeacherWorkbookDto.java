package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.*;
import org.springframework.util.Assert;

@Getter
@ToString
public class TeacherWorkbookDto {

    private Long workbookId;
    private Boolean isOriginal;
    private String title;
    private String workbookImgPath;
    private int bookmarkCount;
    private int scrapCount;


    @Builder
    public TeacherWorkbookDto(Long workbookId, Boolean isOriginal, String title, String workbookImgPath, int bookmarkCount, int scrapCount) {
        Assert.notNull(workbookId, "workbookId must not be null");
        Assert.notNull(title, "title must not be null");
        Assert.notNull(workbookId, "workbookId must not be null");
        Assert.notNull(bookmarkCount, "bookmarkCount must not be null");
        Assert.notNull(scrapCount, "scrapCount must not be null");

        this.workbookId = workbookId;
        this.isOriginal = isOriginal;
        this.title = title;
        this.workbookImgPath = workbookImgPath;
        this.bookmarkCount = bookmarkCount;
        this.scrapCount = scrapCount;
    }
}
