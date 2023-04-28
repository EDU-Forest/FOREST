package com.ssafy.forestauth.service;

import com.ssafy.forestauth.auth.jwt.JwtProvider;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidValueException;
import com.ssafy.forestauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public String reissueAccessToken(String accessToken, String refreshToken) {
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new InvalidValueException(ErrorCode.AUTH_REFRESH_NOT_VALID);
        }

        Authentication authentication = jwtProvider.getAuthentication(accessToken);
        Long userId = Long.parseLong(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
        User findUserById = userRepository.findById(userId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));


        if (!refreshToken.equals(findUserById.getRefreshToken())) {
            throw new InvalidValueException(ErrorCode.AUTH_REFRESH_NOT_VALID);
        }

        return jwtProvider.createAccessToken(authentication);
    }
}
