package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetStudentPointListResponseDto {
    private int studentNum;
    private int score;
}
