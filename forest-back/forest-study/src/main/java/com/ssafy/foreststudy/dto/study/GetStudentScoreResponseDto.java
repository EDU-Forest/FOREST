package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GetStudentScoreResponseDto {
    private int totalScore;
    private int studentScore;
    private int percentage;
    private int correctNum;
    private Long solvingTime;
}
