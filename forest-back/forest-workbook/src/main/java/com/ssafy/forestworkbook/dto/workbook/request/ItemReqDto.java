package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

@Getter
public class ItemReqDto {

    private Long itemId;
    private Long problemId;
    private int no;
    private String content;
    private Boolean isImage;

}
