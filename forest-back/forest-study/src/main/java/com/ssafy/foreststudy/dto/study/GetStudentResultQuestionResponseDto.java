package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetStudentResultQuestionResponseDto {
    private int problemNum;
    private Boolean isCorrected;
}
