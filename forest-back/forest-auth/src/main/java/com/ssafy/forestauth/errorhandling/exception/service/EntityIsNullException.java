package com.ssafy.forestauth.errorhandling.exception.service;


import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.errorhandling.exception.DefaultException;
import lombok.Getter;

@Getter
public class EntityIsNullException extends DefaultException {
    private ErrorCode errorCode;
    public EntityIsNullException(String message) {
        super(message);
    }

    public EntityIsNullException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
