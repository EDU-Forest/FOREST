package com.ssafy.foreststudy.dto.canvas;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetLineResponseDto {
    private Boolean drawMode;
    private String strokeColor;
    private int strokeWidth;

    private GetLineResponseDto paths;
}
