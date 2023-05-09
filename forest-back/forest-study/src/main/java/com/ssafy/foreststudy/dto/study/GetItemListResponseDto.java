package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetItemListResponseDto {
    private Long itemId;
    private int no;
    private String content;
    private Boolean isImage;
}
