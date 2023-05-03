package com.ssafy.forestauth.dto.classes;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
public class SaveClassRequestDto {
    @NotNull(message = "class의 name은 필수 값입니다!!")
    @NotEmpty(message = "class의 name이 빈 문자열입니다!!")
    private String name;
}
