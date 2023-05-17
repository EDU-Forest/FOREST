package com.ssafy.forestworkbook.dto.workbook.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BestWorkbookDto {

    private Long workbookId;
    private String title;
    private String workbookImgPath;
    private Long creatorId;
    private int count;

    @QueryProjection
    public BestWorkbookDto(Long workbookId, String title, String workbookImgPath, Long creatorId, int count) {
        this.workbookId = workbookId;
        this.title = title;
        this.workbookImgPath = workbookImgPath;
        this.creatorId = creatorId;
        this.count = count;
    }

}
