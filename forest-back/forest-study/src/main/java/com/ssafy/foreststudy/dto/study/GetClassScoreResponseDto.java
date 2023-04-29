package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetClassScoreResponseDto {
    private double average;
    private double standardDeviation;
    private Long averageSolvingTime;
}
