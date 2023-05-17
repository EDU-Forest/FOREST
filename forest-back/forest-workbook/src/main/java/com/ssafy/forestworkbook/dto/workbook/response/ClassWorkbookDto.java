package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ClassWorkbookDto {

        private Long studyId;
        private String title;
        private String workbookImgPath;
        private Boolean isFinished;

        @Builder
        public ClassWorkbookDto(Long studyId, String title, String workbookImgPath,Boolean isFinished) {
            this.studyId = studyId;
            this.title = title;
            this.workbookImgPath = workbookImgPath;
            this.isFinished = isFinished;
    }
}
