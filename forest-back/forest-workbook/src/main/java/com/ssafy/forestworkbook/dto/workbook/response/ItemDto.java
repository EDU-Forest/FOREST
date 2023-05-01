package com.ssafy.forestworkbook.dto.workbook.response;

import com.ssafy.forestworkbook.entity.Item;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ItemDto {

        private Long itemId;
        private int no;
        private String content;
        private Boolean isImage;

        @Builder
        public ItemDto(Long itemId, int no, String content, Boolean isImage) {
                this.itemId = itemId;
                this.no = no;
                this.content = content;
                this.isImage = isImage;
        }
}
