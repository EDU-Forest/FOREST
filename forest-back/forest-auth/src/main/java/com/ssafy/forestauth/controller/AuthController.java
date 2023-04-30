package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.ReissueResponseDto;
import com.ssafy.forestauth.service.AuthService;
import com.ssafy.forestauth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/reissue")
    public ResponseEntity<ResponseSuccessDto<ReissueResponseDto>> reissueAccessToken(HttpServletRequest request,
                                                                                     @RequestHeader("Authorization") String accessToken) {
        accessToken = accessToken.substring(7);

        String refreshToken = SecurityUtil.getCookie(request, "refresh")
                .orElseThrow(() -> new RuntimeException("refresh token이 존재하지 않습니다."))
                .getValue();
        log.info("refresh token : {}", refreshToken);
        return ResponseEntity.ok(authService.reissueAccessToken(accessToken, refreshToken));
    }
}
