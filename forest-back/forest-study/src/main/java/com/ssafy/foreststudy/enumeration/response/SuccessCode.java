package com.ssafy.foreststudy.enumeration.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum SuccessCode {

    /* 스터디 일정 조회 성공 */
    STUDY_SUCCESS_CALENDAR(HttpStatus.OK,"시험 일정 조회 성공"),
    /* 최근 진행한 시험 정보 조회 성공 */
    STUDY_SUCCESS_RECENT(HttpStatus.OK,"최근 진행한 클래스 시험 결과 조회 성공"),

    STUDY_NONE_RECENT(HttpStatus.OK,"최근 진행한 클래스 시험 결과 없음"),
    STUDY_SUCCESS_INFO_BEFORE(HttpStatus.OK,"진행 전, 진행 중 시험 정보 조회 성공"),
    STUDY_SUCCESS_INFO_AFTER(HttpStatus.OK,"진행 완료된 시험 정보 조회 성공"),
    STUDY_SUCCESS_RESULT_QUESTION(HttpStatus.OK,"시험 문항별 정답률 조회 성공"),
    STUDY_SUCCESS_RESULT_ALL(HttpStatus.OK,"시험 전체 정답률 조회 성공"),
    STUDY_SUCCESS_RESULT_ACHIEVEMENT(HttpStatus.OK,"시험 응시자별 성취도 조회 성공"),
    STUDY_SUCCESS_RESULT_QUESTION_USER(HttpStatus.OK,"학생 문항별 정답 여부 조회 성공");


    private final HttpStatus status;
    private final String message;

}
