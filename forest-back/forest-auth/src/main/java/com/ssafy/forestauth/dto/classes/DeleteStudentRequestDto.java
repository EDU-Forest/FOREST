package com.ssafy.forestauth.dto.classes;

import lombok.Getter;

@Getter
public class DeleteStudentRequestDto {
    private Long userId;
    private Long classId;
}
