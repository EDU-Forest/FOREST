package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ClassWorkbookDto {

        private Long workbookId;
        private String title;
        private String workbookImgPath;
        private Boolean isFinished;

        @Builder
        public ClassWorkbookDto(Long workbookId, String title, String workbookImgPath,Boolean isFinished) {
            this.workbookId = workbookId;
            this.title = title;
            this.workbookImgPath = workbookImgPath;
            this.isFinished = isFinished;
    }
}
