package com.ssafy.forestauth.dto.classes;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RecentClassResponseDto {
    private Long classId;
    private String className;
}
