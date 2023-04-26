package com.ssafy.forestauth.errorhandling.exception.service;

import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.errorhandling.exception.DefaultException;
import lombok.Getter;

@Getter
public class InvalidPasswordException extends DefaultException {
    private ErrorCode errorCode;

    public InvalidPasswordException(String message) {
        super(message);
    }

    public InvalidPasswordException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
