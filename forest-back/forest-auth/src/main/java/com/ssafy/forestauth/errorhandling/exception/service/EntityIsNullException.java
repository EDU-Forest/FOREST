package com.ssafy.forestauth.errorhandling.exception.service;


import com.ssafy.forestauth.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
