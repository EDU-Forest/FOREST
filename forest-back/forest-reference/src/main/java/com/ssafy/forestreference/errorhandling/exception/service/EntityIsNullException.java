package com.ssafy.forestreference.errorhandling.exception.service;


import com.ssafy.forestreference.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
