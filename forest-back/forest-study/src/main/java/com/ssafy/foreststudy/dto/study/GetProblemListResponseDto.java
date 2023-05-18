package com.ssafy.foreststudy.dto.study;

import com.ssafy.foreststudy.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetProblemListResponseDto {
    private Long studentStudyProblemId;
    private int problemNum;
    private EnumProblemTypeStatus type;
    private String title;
    private int point;
    private String text;
    private String problemImgPath;
    private String userAnswer;
    private String problemAnswer;
    private List<GetItemListResponseDto> item;
}
