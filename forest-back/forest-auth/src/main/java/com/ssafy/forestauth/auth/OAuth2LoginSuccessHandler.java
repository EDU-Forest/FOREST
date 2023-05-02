package com.ssafy.forestauth.auth;

import com.ssafy.forestauth.auth.jwt.JwtProvider;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import com.ssafy.forestauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${jwt.redirect-url}")
    private String accessTokenRedirectUrl;

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            String accessToken = jwtProvider.createAccessToken(authentication);
            log.info("new access token : {}", accessToken);

            String refreshToken = jwtProvider.createRefreshToken();
            log.info("new refresh token : {}", refreshToken);

            Long userId = oAuth2User.getUserId();
            log.info("유저 아이디 : {}", userId);

            ResponseCookie refreshCookie = ResponseCookie.from("forest_refresh_token", refreshToken)
                    .httpOnly(true)
                    .maxAge(jwtProvider.refreshTokenValidateTime)
                    .path("/")
                    .build();

            // 로그인 실패가 발생했을 떄 세션에 저장된 에러 지움
            clearAuthenticationAttributes(request);
            response.addHeader("Set-Cookie", refreshCookie.toString());

            String targetUrl;
            User user = userRepository.findById(userId).get();
            user.updateRefreshToken(refreshToken);

            // 신규 유저인 경우
            if(user.getName() == null || user.getName().equals("")) {
                log.info("SuccessHandler, 신규 유저");
                String email = user.getEmail();
                targetUrl = UriComponentsBuilder.fromUriString(accessTokenRedirectUrl)
                        .queryParam("email", email)
                        .queryParam("accessToken", accessToken)
                        .build().toUriString();
            }
            // 기존 유저인 경우
            else {
                log.info("SuccessHandler, 기존 유저");
                String name = user.getName();
                EnumUserRoleStatus role = user.getRole();

                targetUrl = UriComponentsBuilder.fromUriString(accessTokenRedirectUrl)
                        .queryParam("role", role.toString())
                        .queryParam("name", URLEncoder.encode(name))
                        .queryParam("accessToken", accessToken)
                        .build().toUriString();
            }

            log.info("targetUrl : {}", targetUrl);

            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } catch (Exception e) {
            throw e;
        }
    }
}
