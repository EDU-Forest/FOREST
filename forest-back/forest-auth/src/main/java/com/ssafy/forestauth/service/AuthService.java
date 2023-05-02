package com.ssafy.forestauth.service;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestauth.auth.jwt.JwtProvider;
import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.ReissueResponseDto;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.repository.UserRepository;
import com.ssafy.forestauth.util.ResponseUtil;
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

    private final ResponseUtil responseUtil;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public ResponseSuccessDto<ReissueResponseDto> reissueAccessToken(String accessToken, String refreshToken) {
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new CustomException(ErrorCode.AUTH_REFRESH_NOT_VALID);
        }

        Authentication authentication = jwtProvider.getAuthentication(accessToken);
        Long userId = Long.parseLong(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
        User findUserById = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.AUTH_USER_NOT_FOUND));

        if (!refreshToken.equals(findUserById.getRefreshToken())) {
            throw new CustomException(ErrorCode.AUTH_REFRESH_NOT_VALID);
        }


        String newToken = jwtProvider.createAccessToken(authentication);
        ReissueResponseDto reissueResponseDto = ReissueResponseDto.builder()
                .token(newToken)
                .build();

        ResponseSuccessDto<ReissueResponseDto> res = responseUtil.successResponse(reissueResponseDto, SuccessCode.AUTH_GET_NEW_TOKEN);
        return res;
    }
}
