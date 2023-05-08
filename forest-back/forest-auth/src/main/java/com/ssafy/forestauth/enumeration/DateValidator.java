package com.ssafy.forestauth.enumeration;

import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Slf4j
public class DateValidator implements ConstraintValidator<ValidDate, String> {

  private String pattern;

  @Override
  public void initialize(ValidDate constraintAnnotation) {
    this.pattern = constraintAnnotation.pattern();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {

    try {
      LocalDate.from(LocalDate.parse(value, DateTimeFormatter.ofPattern(this.pattern)));
    } catch (DateTimeParseException e) {
      log.error("DateValidator : {}", e);
      return false;
    }
    return true;
  }
}