package com.ssafy.forestauth.errorhandling.exception.service;


import com.ssafy.forestauth.errorhandling.exception.DefaultException;

public class DuplicatedValueException extends DefaultException {
    public DuplicatedValueException(String message) {
        super(message);
    }
}
