package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStudyInfoResponseDto {
    private String userName;
    private String studyName;
    private int volume;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
