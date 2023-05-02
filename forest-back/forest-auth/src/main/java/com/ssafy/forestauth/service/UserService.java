package com.ssafy.forestauth.service;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.*;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidPasswordException;
import com.ssafy.forestauth.repository.UserRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    private Long expireTimeMs = 1000 * 60 * 60L;

    // 일반 회원가입
    public ResponseSuccessDto<SignupResponseDto> signupCommon(SignupRequestDto signupRequestDto) {
        User user = new User();
        user.createUser(signupRequestDto);
        user.encodePassword(encoder.encode(signupRequestDto.getPw()));
        userRepository.save(user);

        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .name(user.getName())
                .role(user.getRole())
                .build();
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto, SuccessCode.AUTH_SIGN_UP_SUCCESS);
        return res;
    }

    // 소셜 회원 정보 추가
    public ResponseSuccessDto<SignupResponseDto> signupSocial(Long userId, SignupSocialRequestDto signupSocialRequestDto) {
        User findUserById = userRepository.findById(userId)
                .orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));
        findUserById.updateUserInfo(signupSocialRequestDto);

        log.info("signup request name : {}", signupSocialRequestDto.getName());
        log.info("signup request role : {}", signupSocialRequestDto.getRole().toString());

        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .name(findUserById.getName())
                .role(findUserById.getRole())
                .build();

        log.info("responseDto name : {}", signupResponseDto.getName());
        log.info("responseDto role : {}", signupResponseDto.getRole());
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto, SuccessCode.AUTH_SIGN_UP_SUCCESS);
        return res;
    }

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
}
