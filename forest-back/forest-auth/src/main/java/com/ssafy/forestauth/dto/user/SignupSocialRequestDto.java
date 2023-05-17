package com.ssafy.forestauth.dto.user;

import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import com.ssafy.forestauth.enumeration.ValidDate;
import com.ssafy.forestauth.enumeration.ValidEnum;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
public class SignupSocialRequestDto {
    @NotNull(message = "이름은 필수 값입니다!!")
    @NotBlank(message = "이름이 빈 문자열입니다!!")
    @Size(min = 2, max = 8, message = "이름의 길이는 2~8입니다")
    private String name;
    @NotNull(message = "전화번호는 필수 값입니다!!")
    @NotBlank(message = "전화번호가 빈 문자열입니다!!")
    private String phone;
//    @ValidDate(message = "8자리의 yyyy-MM-dd 형식이어야 합니다.", pattern = "yyyy-MM-dd")
    private LocalDate birth;
//    @ValidEnum(enumClass = EnumUserRoleStatus.class)
    private EnumUserRoleStatus role;
//    @ValidEnum(enumClass = EnumUserProviderStatus.class)
    private EnumUserProviderStatus provider;
}
