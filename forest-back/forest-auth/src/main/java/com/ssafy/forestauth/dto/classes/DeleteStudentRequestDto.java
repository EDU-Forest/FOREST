package com.ssafy.forestauth.dto.classes;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class DeleteStudentRequestDto {
    @NotNull(message = "userId는 필수 값입니다!!")
    private Long userId;
    @NotNull(message = "classId는 필수 값입니다!!")
    private Long classId;
}
