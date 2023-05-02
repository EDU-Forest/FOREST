package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

import java.util.List;

@Getter
public class ProblemDto {

    private Long problemId;
    private String title;
    private String path;
    private String text;
    private String answer;
    private int point;
    private List<ItemReqDto> itemList;

}