package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ImagePathDto {

        private String path;

        @Builder
        public ImagePathDto(String path) {
            this.path = path;
    }
}
