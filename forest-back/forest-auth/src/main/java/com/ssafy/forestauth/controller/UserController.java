package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.SignupRequestDto;
import com.ssafy.forestauth.dto.user.SignupResponseDto;
import com.ssafy.forestauth.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Api("Auth Controller V1")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/common")
    public ResponseEntity<ResponseSuccessDto<SignupResponseDto>> signupCommon(@RequestBody @Valid SignupRequestDto signupRequestDto) {
        return ResponseEntity.ok(userService.signupCommon(signupRequestDto));
    }
}
