package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ItemResDto {

        private Long itemId;
        private int no;
        private String content;
        private Boolean isImage;

        @Builder
        public ItemResDto(Long itemId, int no, String content, Boolean isImage) {
                this.itemId = itemId;
                this.no = no;
                this.content = content;
                this.isImage = isImage;
        }
}
