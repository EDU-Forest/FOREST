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

//    @Value("${jwt.redirect-url}")
//    private String accessTokenRedirectUrl;

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            String accessToken = jwtProvider.createAccessToken(authentication);
            log.info("new access token : {}", accessToken);

            String refreshToken = jwtProvider.createRefreshToken(authentication);
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

            String targetUrl = "/login/success";
            User user = userRepository.findById(userId).get();

            // 기존 유저인 경우
            if(user.getName() != null) {
                String name = user.getName();
                EnumUserRoleStatus role = user.getRole();

                targetUrl += "?role=" + role.toString() + "&name=" + name + "&accessToken=" + accessToken;
            }
            // 신규 유저인 경우
            else {
                String email = user.getEmail();

                targetUrl += "?email=" + email + "&accessToken=" + accessToken;
            }

            targetUrl = URLEncoder.encode(targetUrl);
            getRedirectStrategy().sendRedirect(request, response, targetUrl);

        } catch (Exception e) {
            throw e;
        }
    }
}
