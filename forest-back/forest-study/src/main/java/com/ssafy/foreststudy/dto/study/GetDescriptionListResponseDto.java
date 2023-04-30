package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetDescriptionListResponseDto {
    private Long problemListId;
    private String title;
    private int point;
    private int keywordNum;
    private List<GetKeywordListResponseDto> keywordList;
    private List<GetStudentAnswerListResponseDto> studentList;
}
