package com.ssafy.forestauth.dto.user;

import lombok.Getter;

@Getter
public class LoginRequestDto {
    private String email;
    private String pw;
}
