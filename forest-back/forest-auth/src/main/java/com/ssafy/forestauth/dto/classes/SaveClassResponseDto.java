package com.ssafy.forestauth.dto.classes;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SaveClassResponseDto {
    private Long classId;
    private String className;
    private String message;
}
