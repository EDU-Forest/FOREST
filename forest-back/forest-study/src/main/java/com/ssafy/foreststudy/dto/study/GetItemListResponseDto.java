package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetItemListResponseDto {
    private Long itemId;
    private int no;
    private String content;
    private Boolean isImage;
}
