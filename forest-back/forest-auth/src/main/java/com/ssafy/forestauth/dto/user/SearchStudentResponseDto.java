package com.ssafy.forestauth.dto.user;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SearchStudentResponseDto {
    private Long userId;
    private String name;
    private int age;
    private String email;
    private String phone;
}
