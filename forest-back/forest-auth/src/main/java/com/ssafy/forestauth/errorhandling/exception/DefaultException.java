package com.ssafy.forestauth.errorhandling.exception;

import com.ssafy.forestauth.enumeration.response.ErrorCode;

public class DefaultException extends RuntimeException {

    private static final String MESSAGE = "Unkown exception";

    public DefaultException() {
        super(MESSAGE);
    }

    public DefaultException(String message) {
        super(message);
    }

    public DefaultException(String message, Throwable cause) {
        super(message, cause);
    }

    public DefaultException(Throwable cause) {
        super(cause);
    }

    public DefaultException(ErrorCode errorCode) {
        super(errorCode.getMessage());
    }
}
