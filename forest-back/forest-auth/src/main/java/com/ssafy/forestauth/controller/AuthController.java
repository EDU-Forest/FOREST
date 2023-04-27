package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.service.AuthService;
import com.ssafy.forestauth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
    public String reissueAccessToken(HttpServletRequest request,
                                     @RequestHeader("Authorization") String accessToken,
                                     @AuthenticationPrincipal UserDetails userDetails) {
        accessToken = accessToken.substring(7);

        String refreshToken = SecurityUtil.getCookie(request, "refresh")
                .orElseThrow(() -> new RuntimeException("refresh token이 존재하지 않습니다."))
                .getValue();
        log.info("refresh token : {}", refreshToken);

        String newAccessToken = authService.reissueAccessToken(accessToken, refreshToken);
        return newAccessToken;
    }
}
