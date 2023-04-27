package com.ssafy.forestauth.errorhandling.exception.service;


import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.errorhandling.exception.DefaultException;

public class DuplicatedValueException extends DefaultException {
    private ErrorCode errorCode;

    public DuplicatedValueException(String message) {
        super(message);
    }

    public DuplicatedValueException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
