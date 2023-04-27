package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.*;
import com.ssafy.forestauth.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api("Auth Controller V1")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    /**
     * 회원가입
     */
    @PostMapping("/common")
    public ResponseEntity<ResponseSuccessDto<SignupResponseDto>> signupCommon(@RequestBody @Valid SignupRequestDto signupRequestDto) {
        return ResponseEntity.ok(userService.signupCommon(signupRequestDto));
    }

    /**
     * 일반 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<ResponseSuccessDto<LoginResponseDto>> login(@RequestBody @Valid LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(userService.login(loginRequestDto));
    }

    /**
     * 이름으로 학생 검색
     */
    @GetMapping("/search")
    public ResponseEntity<ResponseSuccessDto<List<SearchStudentResponseDto>>> searchStudent(@RequestParam("userName") String userName) {
        return ResponseEntity.ok(userService.searchStudent(userName));
    }

}
