package com.ssafy.forestauth.enumeration.response;

import com.ssafy.forest.exception.Codable;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode implements Codable {
    /**
     * JWT
     */
    AUTH_NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, "우효하지 않은 토큰입니다", true),
    AUTH_WRONG_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다.", true),
    AUTH_UNSUPPORTED_TOKEN(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다.", true),
    AUTH_EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "Access Token 기한이 만료되었습니다.", true),
    AUTH_REFRESH_NOT_VALID(HttpStatus.UNAUTHORIZED, "Refresh Token이 유효하지 않습니다.", true),


    /**
     * 이메일 중복 검사
     * 회원가입(일반)
     * 회원가입 여부 확인(소셜 로그인)
     */
    AUTH_EMAIL_NOT_VALID(HttpStatus.BAD_REQUEST, "이메일 형식이 잘못되었습니다.", true),

    /**
     * 회원가입(일반)
     */
    AUTH_PHONE_NOT_VALID(HttpStatus.BAD_REQUEST, "전화번호 형식이 잘못되었습니다.", true),
    AUTH_PW_NOT_VALID(HttpStatus.BAD_REQUEST, "비밀번호 형식이 잘못되었습니다.", true),
    AUTH_PW_NOT_EQUAL(HttpStatus.BAD_REQUEST, "비밀번호가 서로 일치하지 않습니다.", true),
    AUTH_INPUT_MISSED(HttpStatus.BAD_REQUEST, "요청값이 누락되었습니다.", true),

    /**
     * 로그인
     */
    AUTH_LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "로그인에 실패하였습니다.", true),

    /**
     * 회원가입 여부 확인(소셜 로그인)
     */
    AUTH_PROVIDER_NOT_VALID(HttpStatus.BAD_REQUEST, "유효하지 않은 provider입니다.", true),

    /**
     * 응원 메시지 문구
     */
    AUTH_MESSAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "응원 메시지가 존재하지 않습니다", true),

    /**
     * 메모 조회
     * 메모 등록
     * 선생님/학생 클래스 목록 조회
     * 선생님 클래스 추가
     * 클래스에 학생 추가
     * 학생 삭제
     */
    AUTH_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저가 존재하지 않습니다.", true),

    /**
     * 메모 삭제
     */
    AUTH_MEMO_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 메모가 존재하지 않습니다.", true),

    /**
     * 선생님 클래스 추가, 클래스 이름 중복 검사
     */
    AUTH_USER_NOT_TEACHER(HttpStatus.FORBIDDEN, "해당 유저가 선생님이 아닙니다.", true),
    AUTH_CLASS_NAME_DUPLICATED(HttpStatus.CONFLICT, "동일한 이름의 클래스 이름이 존재합니다.", true),
    AUTH_CLASS_NAME_INVALID(HttpStatus.BAD_REQUEST, "해당 클래스 이름이 길이를 확인해주세요.", true),

    /**
     * 클래스에 학생 추가, 클래스에 속한 학생 목록 조회, 학생 삭제
     */
    AUTH_CLASS_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 클래스가 존재하지 않습니다.", true),
    AUTH_CLASS_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 클래스-유저가 존재하지 않습니다.", true);

    private final HttpStatus status;
    private final String message;
    private final boolean isNotify;

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public boolean getIsNotify() {
        return isNotify;
    }

}
