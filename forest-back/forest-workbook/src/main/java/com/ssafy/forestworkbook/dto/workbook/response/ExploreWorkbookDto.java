package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ExploreWorkbookDto {

    private Long workbookId;
    private String title;
    private String workbookImgPath;
    private int bookmarkCount;
    private int scrapCount;
    private String methodType;
    private Boolean isScraped;
    private Boolean isBookmarked;


    @Builder
    public ExploreWorkbookDto(Long workbookId, String title, String workbookImgPath, int bookmarkCount, int scrapCount, String methodType, boolean isScraped, boolean isBookmarked) {
        this.workbookId = workbookId;
        this.title = title;
        this.workbookImgPath = workbookImgPath;
        this.bookmarkCount = bookmarkCount;
        this.scrapCount = scrapCount;
        this.methodType = methodType;
        this.isScraped = isScraped;
        this.isBookmarked = isBookmarked;
    }
}
