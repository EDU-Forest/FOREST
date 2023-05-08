package com.ssafy.forestauth.enumeration.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum SuccessCode {

    /**
     * 리프래쉬 토큰
     */
    AUTH_GET_NEW_TOKEN(HttpStatus.OK, "토큰 재발급 완료"),

    /**
     * 이메일 중복 검사
     */
    AUTH_EMAIL_NOT_DUPLICATED(HttpStatus.OK, "중복되지 않는 이메일입니다."),
    AUTH_EMAIL_DUPLICATED(HttpStatus.OK, "중복된 이메일입니다."),

    /**
     * 회원가입(일반)
     */
    AUTH_SIGN_UP_SUCCESS(HttpStatus.CREATED, "회원가입 성공하였습니다."),

    /**
     * 로그인
     */
    AUTH_LOGIN_SUCCESS(HttpStatus.OK, "로그인에 성공하였습니다."),

    /**
     * 회원가입 여부 확인(소셜 로그인)
     */
    AUTH_USER_NOT_DUPLICATED(HttpStatus.OK, "회원가입이 가능한 유저입니다."),
    AUTH_USER_DUPLICATED(HttpStatus.OK, "이미 존재하는 유저입니다."),

    /**
     * 응원 메시지 문구
     */
    AUTH_READ_CHEERING_MSG(HttpStatus.OK, "응원 메시지 출력에 성공하였습니다."),

    /**
     * 메모 조회
     */
    AUTH_READ_MEMO(HttpStatus.OK, "메모 조회에 성공하였습니다."),

    /**
     * 메모 등록
     */
    AUTH_SAVE_MEMO(HttpStatus.CREATED, "메모 등록에 성공하였습니다."),

    /**
     * 메모 삭제
     */
    AUTH_MEMO_DELETED(HttpStatus.NO_CONTENT, "메모 삭제에 성공하였습니다."),

    /**
     * 선생님/학생 클래스 목록 조회
     */
    AUTH_READ_CLASS_LIST(HttpStatus.OK, "클래스 목록 조회에 성공하였습니다"),

    /**
     * 선생님 클래스 추가
     */
    AUTH_SAVE_CLASS(HttpStatus.CREATED, "선생님 클래스 생성에 성공하였습니다."),

    /**
     * 클래스에 학생 추가
     */
    AUTH_STUDENT_INSERTED_CLASS(HttpStatus.CREATED, "클레스에 학생을 추가하였습니다."),

    /**
     * 클래스 이름 중복 검사
     */
    AUTH_CLASS_NAME_NOT_DUPLICATED(HttpStatus.OK, "해당 클래스 이름이 중복되지 않습니다."),
    AUTH_CLASS_NAME_DUPLICATED(HttpStatus.OK, "해당 클래스 이름이 중복됩니다."),

    /**
     * 학생 자동 검색
     */
    AUTH_SEARCH_STUDENT(HttpStatus.OK, "학생 조회에 성공하였습니다."),

    /**
     * 클래스에 속한 학생 목록 조회
     */
    AUTH_READ_STUDENT_IN_CLASS(HttpStatus.OK, "클래스 내의 학생 목록 조회에 성공하였습니다."),

    /**
     * 클래스에서 학생 제외
     */
    AUTH_STUDENT_EXCLUDED(HttpStatus.NO_CONTENT, "해당 클래스에서 학생 제외에 성공하였습니다"),

    /**
     * 선생님 최근 생성 클래스 조회
     */
    AUTH_CLASS_RECENT_ONE(HttpStatus.OK, "최근 생성 클래스 조회를 성공하였습니다."),
    AUTH_CLASS_RECENT_NO_ONE(HttpStatus.OK, "최근 클래스가 존재하지 않습니다.");


    private final HttpStatus status;
    private final String message;
}
