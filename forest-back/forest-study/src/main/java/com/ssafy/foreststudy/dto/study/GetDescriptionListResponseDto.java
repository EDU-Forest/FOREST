package com.ssafy.foreststudy.dto.study;

import com.ssafy.foreststudy.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetDescriptionListResponseDto {
    private Long studentStudyProblemId;
    private int problemNum;
    private EnumProblemTypeStatus type;
    private String title;
    private String text;
    private String problemImgPath;
    private List<GetItemListResponseDto> item;
}
