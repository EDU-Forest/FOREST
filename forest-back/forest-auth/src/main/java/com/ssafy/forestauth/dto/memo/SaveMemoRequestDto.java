package com.ssafy.forestauth.dto.memo;

import lombok.Getter;

@Getter
public class SaveMemoRequestDto {
    private Long userId;
    private String content;
}
