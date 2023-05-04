package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.util.Assert;

@Getter
@ToString
public class TeacherWorkbookDto {

    private Long workbookId;
    private Boolean isOriginal;
    private String title;
    private String workbookImgPath;
    private Boolean isBookmarked;
    private int bookmarkCount;
    private int scrapCount;


    @Builder
    public TeacherWorkbookDto(Long workbookId, Boolean isOriginal, Boolean isBookmarked, String title, String workbookImgPath, int bookmarkCount, int scrapCount) {
        this.workbookId = workbookId;
        this.isOriginal = isOriginal;
        this.isBookmarked = isBookmarked;
        this.title = title;
        this.workbookImgPath = workbookImgPath;
        this.bookmarkCount = bookmarkCount;
        this.scrapCount = scrapCount;
    }
}
