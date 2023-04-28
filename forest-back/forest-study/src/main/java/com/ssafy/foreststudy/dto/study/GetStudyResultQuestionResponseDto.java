package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStudyResultQuestionResponseDto {
    private int problemNum;
    private int correctRate;
    private int incorrectRate;
    private int ungradedRate;
}
