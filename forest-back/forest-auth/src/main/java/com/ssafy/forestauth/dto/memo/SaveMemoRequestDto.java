package com.ssafy.forestauth.dto.memo;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
public class SaveMemoRequestDto {
    @NotNull(message = "memo content는 필수 값입니다!!")
    @NotBlank(message = "memo content가 빈 문자열입니다!!")
    private String content;
}
