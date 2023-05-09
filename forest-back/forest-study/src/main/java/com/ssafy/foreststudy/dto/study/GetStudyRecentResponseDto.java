package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStudyRecentResponseDto {
    private Long studyId;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String userName;
    private String studyType;
    private String scheduleType;
    private LocalDateTime studyCreatedDate;
    private LocalDateTime workbookCreatedDate;
    private int volume;
    private Boolean isPublic;
    private double average;
    private double standardDeviation;
    private Long averageSolvingTime;
    private int totalStudent;
    private int participantStudent;
    private int takeRate;
    private Boolean isFinished;
}
