package com.ssafy.forestreference.errorhandling.exception.service;


import com.ssafy.forestreference.errorhandling.exception.DefaultException;

public class DuplicatedValueException extends DefaultException {
    public DuplicatedValueException(String message) {
        super(message);
    }
}
