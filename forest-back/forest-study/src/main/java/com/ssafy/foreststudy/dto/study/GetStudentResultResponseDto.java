package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStudentResultResponseDto {
    private int score;
    private int correctNum;
    private Long solvingTime;
    private int correctRate;
    private Boolean isGraded;
    private int volume;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
