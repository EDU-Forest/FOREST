package com.ssafy.forestworkbook.dto.workbook;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WorkbookInfo {

        private Long workbookId;
        private String title;
        private String workbookImgPath;
        private String description;
        private Boolean isPublic;
        private int volume;
        private int bookmarkCount;
        private int scrapCount;

        @Builder
        public WorkbookInfo(Long workbookId, String title, String workbookImgPath, String description, Boolean isPublic, int volume) {
            this.workbookId = workbookId;
            this.title = title;
            this.workbookImgPath = workbookImgPath;
            this.description = description;
            this.isPublic = isPublic;
            this.volume = volume;
            this.bookmarkCount = 0;
            this.scrapCount = 0;

    }
}
