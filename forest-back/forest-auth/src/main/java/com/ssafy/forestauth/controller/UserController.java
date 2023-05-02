package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.*;
import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ResponseSuccessDto<SignupResponseDto>> signupSocial(
            @RequestBody SignupSocialRequestDto signupSocialRequestDto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(userService.signupSocial(userId, signupSocialRequestDto));
    }

    // 이름으로 학생 검색
    @GetMapping("/search")
    public ResponseEntity<ResponseSuccessDto<List<SearchStudentResponseDto>>> searchStudent(
            @RequestParam("userName") String userName) {
        return ResponseEntity.ok(userService.searchStudent(userName));
    }

}
