package com.ssafy.forestauth.service;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestauth.auth.jwt.JwtProvider;
import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.*;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.repository.UserRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final ResponseUtil responseUtil;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtProvider jwtProvider;
    private Long expireTimeMs = 1000 * 60 * 60L;

    // 일반 회원가입
    public ResponseSuccessDto<SignupCommonResponseDto> signupCommon(SignupRequestDto signupRequestDto) {
        User user = new User();
        user.createUser(signupRequestDto);
        user.encodePassword(encoder.encode(signupRequestDto.getPw()));
        userRepository.save(user);

        SignupCommonResponseDto signupCommonResponseDto = SignupCommonResponseDto.builder()
                .message(SuccessCode.AUTH_SIGN_UP_SUCCESS.getMessage())
                .build();
        ResponseSuccessDto<SignupCommonResponseDto> res = responseUtil.successResponse(signupCommonResponseDto, SuccessCode.AUTH_SIGN_UP_SUCCESS);
        return res;
    }

    // 소셜 회원가입
    public ResponseSuccessDto<SignupSocialResponseDto> signupSocial(Long userId, SignupSocialRequestDto signupSocialRequestDto) {
        User findUserById = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.AUTH_USER_NOT_FOUND));
        findUserById.updateUserInfo(signupSocialRequestDto);

        SignupSocialResponseDto signupSocialResponseDto = SignupSocialResponseDto.builder()
                .name(findUserById.getName())
                .role(findUserById.getRole())
                .build();

        ResponseSuccessDto<SignupSocialResponseDto> res = responseUtil.successResponse(signupSocialResponseDto, SuccessCode.AUTH_SIGN_UP_SUCCESS);
        return res;
    }

    // 이름으로 학생 조회
    public ResponseSuccessDto<List<SearchStudentResponseDto>> searchStudent(String userName) {
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

    // 이메일 중보 검사
    public ResponseSuccessDto<CheckEmailResponseDto> checkEmail(String email) {
        Optional<User> findUser = userRepository.findByEmailAndAuthProvider(email, EnumUserProviderStatus.LOCAL);
        SuccessCode successCode = findUser.isEmpty() ? SuccessCode.AUTH_EMAIL_NOT_DUPLICATED : SuccessCode.AUTH_EMAIL_DUPLICATED;

        CheckEmailResponseDto checkEmailResponseDto = CheckEmailResponseDto.builder()
                .message(successCode.getMessage())
                .build();

        ResponseSuccessDto<CheckEmailResponseDto> res = responseUtil.successResponse(checkEmailResponseDto, successCode);
        return res;
    }

    public ResponseSuccessDto<LoginResponseDto> loginCommon(LoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        String pw = loginRequestDto.getPw();

        User findUser = userRepository.findByEmailAndAuthProvider(email, EnumUserProviderStatus.LOCAL)
                .orElseThrow(() -> new CustomException(ErrorCode.AUTH_USER_NOT_FOUND));

        if(!encoder.matches(pw, findUser.getPassword())) {
            log.info("비밀번호 불일치");
            throw new CustomException(ErrorCode.AUTH_USER_NOT_FOUND);
        }

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .name(findUser.getName())
                .role(findUser.getRole())
                .accessToken(jwtProvider.createAccessTokenCommon(findUser.getId()))
                .build();

        ResponseSuccessDto<LoginResponseDto> res = responseUtil.successResponse(loginResponseDto, SuccessCode.AUTH_LOGIN_SUCCESS);
        return res;
    }
}
