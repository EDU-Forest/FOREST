package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.*;
import com.ssafy.forestauth.service.UserService;
import com.ssafy.forestauth.util.CookieUtil;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Api("User Controller V1")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    // 소셜 회원, 정보 추기
    @PostMapping("/social")
    public ResponseEntity<ResponseSuccessDto<SignupSocialResponseDto>> signupSocial(
            @RequestBody @Valid SignupSocialRequestDto signupSocialRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(userService.signupSocial(userId, signupSocialRequestDto));
    }

    // 이메일 중복 검사
    @GetMapping("/check")
    public ResponseEntity<ResponseSuccessDto<CheckEmailResponseDto>> checkEmail(
            @RequestParam("email")
            @NotNull(message = "email은 필수 값입니다!!")
            @NotEmpty(message = "email이 빈 문자열입니다!!")
            String email
    ) {
        return ResponseEntity.ok(userService.checkEmail(email));
    }

    // 일반 회원가입
    @PostMapping("/common")
    public ResponseEntity<ResponseSuccessDto<SignupCommonResponseDto>> signupCommon(
            @RequestBody @Valid SignupRequestDto signupRequestDto
    ) {
        return ResponseEntity.ok(userService.signupCommon(signupRequestDto));
    }

    // 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<ResponseSuccessDto<LoginResponseDto>> loginCommon(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody @Valid LoginRequestDto loginRequestDto
    ) {
        return ResponseEntity.ok(userService.loginCommon(request, response, loginRequestDto));
    }

    // 이름으로 학생 검색
    @GetMapping("/search")
    public ResponseEntity<ResponseSuccessDto<List<SearchStudentResponseDto>>> searchStudent(
            @RequestParam("classId") @NotNull(message = "classId는 필수 값입니다!!") Long classId,
            @RequestParam("userName") String userName) {
        return ResponseEntity.ok(userService.searchStudent(classId, userName));
    }

}
