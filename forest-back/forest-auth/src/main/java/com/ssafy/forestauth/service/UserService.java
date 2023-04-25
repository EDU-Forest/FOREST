package com.ssafy.forestauth.service;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.SignupRequestDto;
import com.ssafy.forestauth.dto.user.SignupResponseDto;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.repository.UserRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final ResponseUtil responseUtil;
    private final UserRepository userRepository;

    // 일반 회원가입
    public ResponseSuccessDto<SignupResponseDto> signupCommon(SignupRequestDto signupRequestDto) {

        User user = new User();
        user.createUser(signupRequestDto);
        userRepository.save(user);

        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .message(SuccessCode.AUTH_SIGN_UP_SUCCESS.getMessage())
                .build();
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto, SuccessCode.AUTH_SIGN_UP_SUCCESS);
        return res;
    }
}
