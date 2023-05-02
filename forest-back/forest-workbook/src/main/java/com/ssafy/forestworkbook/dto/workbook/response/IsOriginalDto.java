package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class IsOriginalDto {

        private Boolean isOriginal;

        @Builder
        public IsOriginalDto(Boolean isOriginal) {
                this.isOriginal = isOriginal;
        }
}
