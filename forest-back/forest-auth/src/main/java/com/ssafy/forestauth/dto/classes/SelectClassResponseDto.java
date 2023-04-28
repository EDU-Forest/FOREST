package com.ssafy.forestauth.dto.classes;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SelectClassResponseDto {
    private Long classId;
    private String name;
}
