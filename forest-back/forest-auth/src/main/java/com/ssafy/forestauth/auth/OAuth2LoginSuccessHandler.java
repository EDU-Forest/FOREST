package com.ssafy.forestauth.auth;

import com.ssafy.forestauth.auth.jwt.JwtProvider;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            String accessToken = jwtProvider.createAccessToken(authentication);
            log.info("new access token : {}", accessToken);

            String refreshToken = jwtProvider.createRefreshToken(authentication);
            log.info("new refresh token : {}", refreshToken);

            Long userId = oAuth2User.getUserId();
            log.info("유저 아이디 : {}", userId);

            String username = null;

            Optional<User> findUserById = userRepository.findById(userId);
            if(findUserById.isEmpty()) {
                username = "null";
            } else {
                User user = findUserById.get();
                username = user.getName();
            }

            log.info("유저 이름 : {}", username);

            ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)
                    .maxAge(jwtProvider.refreshTokenValidateTime)
                    .path("/")
                    .build();

            ResponseCookie accessCookie = ResponseCookie.from("accessToken", accessToken)
                    .httpOnly(true)
                    .maxAge(JwtProvider.accessTokenValidateTime)
                    .path("/")
                    .build();

            ResponseCookie usernameCookie = ResponseCookie.from("username", username)
                    .httpOnly(true)
                    .maxAge(JwtProvider.accessTokenValidateTime)
                    .path("/")
                    .build();


            // 로그인 실패가 발생했을 떄 세션에 저장된 에러 지움
            clearAuthenticationAttributes(request);
            response.addHeader("Set-Cookie", refreshCookie.toString());
            response.addHeader("Set-Cookie", accessCookie.toString());
            response.addHeader("Set-Cookie", usernameCookie.toString());

            String targetUrl;
            if(oAuth2User.getEmail() == null) {
                targetUrl = "null";
            } else {
                targetUrl = username;
            }

            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } catch (Exception e) {
            throw e;
        }
    }

    private User saveOrUpdateUser(String refreshToken, CustomOAuth2User oAuth2User) {
        Optional<User> findUserByEmail = userRepository.findByEmail(oAuth2User.getEmail());
        User user;

        // 기존 회원 없으면 저장
        if (findUserByEmail.isEmpty()) {
            user = User.builder()
                    .email(oAuth2User.getEmail())
                    .refreshToken(refreshToken)
                    .build();
        }
        // 기존 회원 존재하면 refresh token만 update
        else {
            user = findUserByEmail.get();
            user.updateRefreshToken(refreshToken);
        }
        return userRepository.save(user);
    }

}
