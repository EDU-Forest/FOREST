package com.ssafy.forestauth.dto.user;

import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SignupResponseDto {
    private String name;
    private EnumUserRoleStatus role;
}
