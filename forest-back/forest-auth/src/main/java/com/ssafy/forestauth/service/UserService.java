package com.ssafy.forestauth.service;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.*;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidPasswordException;
import com.ssafy.forestauth.repository.UserRepository;
import com.ssafy.forestauth.util.JwtTokenUtil;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final ResponseUtil responseUtil;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    @Value("${jwt.token.secretKey}")
    private String secretKey;
    private Long expireTimeMs = 1000 * 60 * 60L;

    // 일반 회원가입
    public ResponseSuccessDto<SignupResponseDto> signupCommon(SignupRequestDto signupRequestDto) {
        User user = new User();
        user.createUser(signupRequestDto);
        user.encodePassword(encoder.encode(signupRequestDto.getPw()));
        userRepository.save(user);

        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .message(SuccessCode.AUTH_SIGN_UP_SUCCESS.getMessage())
                .build();
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto, SuccessCode.AUTH_SIGN_UP_SUCCESS);
        return res;
    }

    public ResponseSuccessDto<LoginResponseDto> login(LoginRequestDto loginRequestDto) {
        // email 존재하지 않은 경우
        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        // pw 일치하지 않은 경우, (순서 중요)
        if(!encoder.matches(loginRequestDto.getPw(), user.getPassword())) {
            throw new InvalidPasswordException(ErrorCode.AUTH_PW_NOT_EQUAL);
        }

        String token = JwtTokenUtil.createToken(user.getEmail(), secretKey, expireTimeMs);

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .token(token)
                .build();
        ResponseSuccessDto<LoginResponseDto> res = responseUtil.successResponse(loginResponseDto, SuccessCode.AUTH_LOGIN_SUCCESS);
        return res;
    }

    public ResponseSuccessDto<List<SearchStudentResponseDto>> searchStudent(String userName) {
        System.out.println("userName = " + userName);
        List<User> userList = userRepository.findByNameStartsWithAndRole(userName, EnumUserRoleStatus.STUDENT);

        List<SearchStudentResponseDto> dtoList = new ArrayList<>();
        for (User user : userList) {
            SearchStudentResponseDto dto = SearchStudentResponseDto.builder()
                    .userId(user.getId())
                    .email(user.getEmail())
                    .name(user.getName())
                    .phone(user.getPhone())
                    .build();
            dtoList.add(dto);
        }

        ResponseSuccessDto<List<SearchStudentResponseDto>> res = responseUtil.successResponse(dtoList, SuccessCode.AUTH_SEARCH_STUDENT);
        return res;
    }
}
