package com.ssafy.forestauth.dto.user;

import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class SignupSocialRequestDto {
    private String name;
    private String phone;
    private LocalDate birth;
    private EnumUserRoleStatus role;
    private EnumUserProviderStatus provider;
}
