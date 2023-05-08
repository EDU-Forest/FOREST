package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class WorkbookEditorListDto {

        private List<WorkbookEditorDto> workbookList;

        public WorkbookEditorListDto(List<WorkbookEditorDto> workbookList) {
            this.workbookList = workbookList;
    }
}
