package com.ssafy.forestauth.dto.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDto {
    private String token;
}
