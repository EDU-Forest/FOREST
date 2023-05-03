package com.ssafy.forestauth.dto.user;


import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import lombok.Getter;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Getter
public class SignupRequestDto {
    @NotNull(message = "이름은 필수 값입니다!!")
    @NotBlank(message = "이름이 빈 문자열입니다!!")
    @Size(min = 2, max = 8, message = "이름의 길이는 2~8입니다")
    private String name; // 2~8자 길이 제한 두기
    @NotNull(message = "이메일은 필수 값입니다.")
    @NotBlank(message = "이메일이 빈 문자열입니다!!")
    @Email(message = "이메일 형식이 아닙니다!!")
    private String email;
    @NotNull(message = "전화번호는 필수 값입니다!!")
    @NotBlank(message = "전화번호가 빈 문자열입니다!!")
    private String phone;
    @NotNull(message = "비밀번호는 필수 값입니다!!")
    @NotBlank(message = "비밀번호가 빈 문자열입니다!!")
    private String pw;
    @NotNull(message = "확인 비밀번호는 필수 값입니다!!")
    @NotBlank(message = "확인 비밀번호가 빈 문자열입니다!!")
    private String pw2;
    @NotNull(message = "생년월일은 필수 값입니다!!")
    @NotBlank(message = "생년월일이 빈 문자열입니다!!")
    private LocalDate birth;
    @NotNull(message = "role은 필수 값입니다!!")
    @NotBlank(message = "role이 빈 문자열입니다!!")
    private EnumUserRoleStatus role;
    @NotNull(message = "provider는 필수 값입니다!!")
    @NotBlank(message = "provider가 빈 문자열입니다!!")
    private EnumUserProviderStatus provider;
}
