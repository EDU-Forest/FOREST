package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WorkbookEditorDto {

        private Long workbookId;
        private String title;

        @Builder
        public WorkbookEditorDto(Long workbookId, String title) {
            this.workbookId = workbookId;
            this.title = title;
    }
}
