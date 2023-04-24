package com.ssafy.foreststudy.errorhandling.exception.service;


import com.ssafy.foreststudy.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
