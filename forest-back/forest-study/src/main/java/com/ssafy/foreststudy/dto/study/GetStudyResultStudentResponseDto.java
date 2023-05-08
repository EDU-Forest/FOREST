package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStudyResultStudentResponseDto {
    private Long studentStudyResultId;
    private String name;
    private String email;
    private LocalDateTime enterTime;
    private LocalDateTime exitTime;
    private int correctNum;
    private int correctRate;
}
