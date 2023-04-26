package com.ssafy.foreststudy.enumeration.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    STUDY_CLASS_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 클래스 ID"),
    STUDY_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 스터디 ID"),
    STUDY_CLASS_RESULT_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 스터디 클래스 결과 ID");

    private final HttpStatus status;
    private final String message;

}
