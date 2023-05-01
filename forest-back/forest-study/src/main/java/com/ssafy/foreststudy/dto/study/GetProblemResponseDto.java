package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GetProblemResponseDto {
    private int volume;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private List<GetProblemListResponseDto> problem;
}
