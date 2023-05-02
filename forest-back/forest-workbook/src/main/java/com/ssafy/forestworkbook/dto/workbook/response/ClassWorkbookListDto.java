package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ClassWorkbookListDto {

        private List<ClassWorkbookDto> workbookList;
        @Builder
        public ClassWorkbookListDto(List<ClassWorkbookDto> workbookList) {
            this.workbookList = workbookList;
    }
}
