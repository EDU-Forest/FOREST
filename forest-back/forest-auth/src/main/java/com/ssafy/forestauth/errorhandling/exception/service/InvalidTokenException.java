package com.ssafy.forestauth.errorhandling.exception.service;

import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.errorhandling.exception.DefaultException;
import lombok.Getter;

@Getter
public class InvalidTokenException extends DefaultException {
    private ErrorCode errorCode;

    public InvalidTokenException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
