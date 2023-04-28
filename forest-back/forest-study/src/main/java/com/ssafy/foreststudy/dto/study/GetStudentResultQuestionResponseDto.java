package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStudentResultQuestionResponseDto {
    private int problemNum;
    private Boolean isCorrected;
}
