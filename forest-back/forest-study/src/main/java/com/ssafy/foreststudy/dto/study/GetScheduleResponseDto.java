package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetScheduleResponseDto {
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String className;
    private String studyType;
    private String scheduleType;
}
