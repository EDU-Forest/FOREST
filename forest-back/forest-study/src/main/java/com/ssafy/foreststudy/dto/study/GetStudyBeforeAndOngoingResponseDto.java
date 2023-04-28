package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStudyBeforeAndOngoingResponseDto {
    private Long studyId;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String userName;
    private String studyType;
    private String scheduleType;
}
