package com.ssafy.forestauth.dto.user;

import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignupSocialResponseDto {
    private String name;
    private EnumUserRoleStatus role;
}
