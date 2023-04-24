package com.ssafy.foreststudy.errorhandling.exception.service;


import com.ssafy.foreststudy.errorhandling.exception.DefaultException;

public class DuplicatedValueException extends DefaultException {
    public DuplicatedValueException(String message) {
        super(message);
    }
}
