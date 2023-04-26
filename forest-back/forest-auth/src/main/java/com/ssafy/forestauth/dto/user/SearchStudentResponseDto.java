package com.ssafy.forestauth.dto.user;

import lombok.Getter;

@Getter
public class SearchStudentResponseDto {
    private Long userId;
    private String name;
    private String email;
    private String phone;
}
