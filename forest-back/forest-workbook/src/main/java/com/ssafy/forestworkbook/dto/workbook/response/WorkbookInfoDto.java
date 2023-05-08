package com.ssafy.forestworkbook.dto.workbook.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WorkbookInfoDto {

        private Long workbookId;
        private String title;
        private Long workbookImgId;
        private String workbookImgPath;
        private String description;
        private Boolean isPublic;
        private Boolean isDeploy;
        @JsonProperty("isBookmarked")
        private Boolean iSBookmarked;
        private Boolean isOriginal;
        private int volume;
        private int bookmarkCount;
        private int scrapCount;

        @Builder
        public WorkbookInfoDto(Long workbookId, String title, Long workbookImgId, String workbookImgPath, String description, Boolean isOriginal, Boolean isPublic, Boolean iSBookmarked, Boolean isDeploy, int bookmarkCount, int scrapCount, int volume) {
            this.workbookId = workbookId;
            this.title = title;
            this.workbookImgId = workbookImgId;
            this.workbookImgPath = workbookImgPath;
            this.description = description;
            this.isPublic = isPublic;
            this.isDeploy = isDeploy;
            this.isOriginal = isOriginal;
            this.iSBookmarked = iSBookmarked;
            this.volume = volume;
            this.bookmarkCount = bookmarkCount;
            this.scrapCount = scrapCount;
    }
}
