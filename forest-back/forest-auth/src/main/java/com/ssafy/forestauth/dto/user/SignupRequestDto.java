package com.ssafy.forestauth.dto.user;


import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class SignupRequestDto {
    private String name; // 2~8자 길이 제한 두기
    private String email;
    private String phone;
    private String pw;
    private String pw2;
    private LocalDate birth;
    private EnumUserRoleStatus role;
    private EnumUserProviderStatus provider;
}
