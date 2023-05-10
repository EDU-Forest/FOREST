package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ItemResExceptIdDto {

        private String content;
        private Boolean isImage;

        @Builder
        public ItemResExceptIdDto(String content, Boolean isImage) {
                this.content = content;
                this.isImage = isImage;
        }
}
