package com.ssafy.forestauth.enumeration.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum SuccessCode {
    FOREST_USER_SUCCESS(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String message;
}
