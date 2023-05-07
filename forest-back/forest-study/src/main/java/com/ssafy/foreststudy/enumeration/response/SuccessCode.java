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
    STUDY_SUCCESS_RECENT(HttpStatus.OK,"최근 진행한 클래스 학습 결과 조회 성공"),

    STUDY_NONE_RECENT(HttpStatus.OK,"최근 진행한 클래스 학습 결과 없음"),
    STUDY_SUCCESS_INFO_BEFORE(HttpStatus.OK,"진행 전, 진행 중 학습 정보 조회 성공"),
    STUDY_SUCCESS_INFO_AFTER(HttpStatus.OK,"진행 완료된 학습 정보 조회 성공"),
    STUDY_SUCCESS_RESULT_QUESTION(HttpStatus.OK,"학습 문항별 정답률 조회 성공"),
    STUDY_SUCCESS_RESULT_ALL(HttpStatus.OK,"학습 전체 정답률 조회 성공"),
    STUDY_SUCCESS_RESULT_ACHIEVEMENT(HttpStatus.OK,"학습 응시자별 성취도 조회 성공"),
    STUDY_SUCCESS_RESULT_QUESTION_USER(HttpStatus.OK,"학생 문항별 정답 여부 조회 성공"),
    STUDY_SUCCESS_PROBLEM_LIST(HttpStatus.OK,"학습 문제 전체 목록 조회 성공"),
    STUDY_SAVE_STUDENT_PROBLEM_RESULT(HttpStatus.CREATED,"개인 학습 결과 문제 생성 완료"),
    STUDY_SUCCESS_UPDATE_PROBLEM_RESULT(HttpStatus.NO_CONTENT,"문항 답안 저장 성공"),
    STUDY_SAVE_STUDENT_RESULT(HttpStatus.NO_CONTENT,"학생 학습 종료"),
    STUDY_SUCCESS_RESULT_DESCRIPT_LIST(HttpStatus.OK,"서술형 문제 채점 목록 조회 성공"),
    STUDY_NONE_RESULT_DESCRIPT_LIST(HttpStatus.OK,"서술형 문제 목록 없음"),
    STUDY_END(HttpStatus.OK,"시험 종료"),
    STUDY_SAVE_DESCRIPT(HttpStatus.OK,"서술형 채점 성공"),
    STUDY_SUCCESS_EXIT(HttpStatus.OK,"클래스 학습 종료"),
    STUDY_SUCCESS_INFO(HttpStatus.OK,"시험 시작하기 정보 조회 성공"),
    CANVAS_GET_SUCCESS(HttpStatus.OK,"캔버스 풀이 조회 성공"),
    CANVAS_POST_SUCCESS(HttpStatus.OK,"캔버스 풀이 저장 성공"),
    STUDY_STUDENT_ENTER(HttpStatus.OK,"재입장 성공"),
    STUDY_SUCCESS_RESULT_USER(HttpStatus.OK,"개인 시험 결과 조회 성공"),
    STUDY_ONGOING(HttpStatus.OK,"시험이 진행 중입니다"),
    STUDY_SUBMIT_ALREADY(HttpStatus.OK,"이미 제출하셨습니다"),
    STUDY_NOT_YET(HttpStatus.OK,"시작하지 않은 시험입니다");


    private final HttpStatus status;
    private final String message;

}
