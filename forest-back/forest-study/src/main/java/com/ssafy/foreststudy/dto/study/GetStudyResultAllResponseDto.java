package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetStudyResultAllResponseDto {
    private Long classStudyResultId;
    private int correctAnswerRate;
}
