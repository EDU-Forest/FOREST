package com.ssafy.forestauth.enumeration.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum SuccessCode {
    AUTH_SIGN_UP_SUCCESS(HttpStatus.CREATED, "회원가입 성공");

    private final HttpStatus status;
    private final String message;
}
