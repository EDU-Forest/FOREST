package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetStudentAnswerListResponseDto {
    private int studentNum;
    private String answer;
    private int similarity;
    private int sameNum;
}
