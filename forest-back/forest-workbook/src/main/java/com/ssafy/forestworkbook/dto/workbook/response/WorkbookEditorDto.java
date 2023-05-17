package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class WorkbookEditorDto {

        private Long workbookId;
        private String title;
        private Boolean isDeploy;
        private Boolean isExecute;

        @Builder
        public WorkbookEditorDto(Long workbookId, String title, Boolean isDeploy, Boolean isExecute) {
            this.workbookId = workbookId;
            this.title = title;
            this.isDeploy = isDeploy;
            this.isExecute = isExecute;
    }
}
