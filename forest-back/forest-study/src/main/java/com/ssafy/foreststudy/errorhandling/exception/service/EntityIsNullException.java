package com.ssafy.foreststudy.errorhandling.exception.service;


import com.ssafy.foreststudy.enumeration.response.ErrorCode;
import com.ssafy.foreststudy.errorhandling.exception.DefaultException;
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
