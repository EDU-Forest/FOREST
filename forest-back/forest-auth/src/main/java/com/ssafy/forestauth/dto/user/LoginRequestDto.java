package com.ssafy.forestauth.dto.user;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class LoginRequestDto {
    @NotNull(message = "이메일은 필수 값입니다.")
    @NotBlank(message = "이메일이 빈 문자열입니다!!")
    @Email(message = "이메일 형식이 아닙니다!!")
    private String email;
    @NotNull(message = "비밀번호는 필수 값입니다!!")
    @NotBlank(message = "비밀번호가 빈 문자열입니다!!")
    private String pw;
}
