package com.ssafy.forestauth.enumeration;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EnumValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidDate {
    String message() default "6자리의 yyyyMMdd 형식이어야 합니다.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String pattern() default "yyyyMMdd";
}
