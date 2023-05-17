package com.ssafy.forestauth.dto.classes;

import lombok.Getter;

@Getter
public class SelectStudentResponseDto {
    private Long userId;
    private String name;
    private int age;
    private String email;
    private String phone;
}
