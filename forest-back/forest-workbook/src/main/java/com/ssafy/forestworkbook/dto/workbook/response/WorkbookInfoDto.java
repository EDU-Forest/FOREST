package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WorkbookInfoDto {

        private Long workbookId;
        private String title;
        private String workbookImgPath;
        private String description;
        private Boolean isPublic;
        private int volume;
        private int bookmarkCount;
        private int scrapCount;

        @Builder
        public WorkbookInfoDto(Long workbookId, String title, String workbookImgPath, String description, Boolean isPublic, int bookmarkCount, int scrapCount, int volume) {
            this.workbookId = workbookId;
            this.title = title;
            this.workbookImgPath = workbookImgPath;
            this.description = description;
            this.isPublic = isPublic;
            this.volume = volume;
            this.bookmarkCount = bookmarkCount;
            this.scrapCount = scrapCount;
    }
}
