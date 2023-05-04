package com.ssafy.foreststudy.dto.canvas;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetPathResponseDto {
    private double x;
    private double y;
}
