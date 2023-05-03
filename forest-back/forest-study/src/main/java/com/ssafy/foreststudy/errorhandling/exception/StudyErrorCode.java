package com.ssafy.foreststudy.errorhandling.exception;

import com.ssafy.forest.exception.Codable;
import org.springframework.http.HttpStatus;

public enum StudyErrorCode implements Codable {

    STUDY_CLASS_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 클래스 ID",true),
    AUTH_USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "해당 유저가 존재하지 않습니다.",true),
    STUDY_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 스터디 ID",true),
    STUDY_STUDENT_RESULT_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 개인 시험 결과 ID",true),
    STUDY_STUDENT_RESULT_PROBLEM_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 개인 시험 문제 ID",true),
    STUDY_CLASS_RESULT_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 스터디 클래스 결과 ID",true),
    STUDY_PROBLEM_LIST_NOT_FOUND(HttpStatus.NOT_FOUND,"존재하지 않는 학습 문제 목록 ID",true),
    STUDY_FAILURE_DESCRIPT(HttpStatus.CONFLICT,"항목 개수가 맞지 않습니다.",true),
    AUTH_USER_NOT_IN_CLASS(HttpStatus.FORBIDDEN,"해당 유저는 클래스 회원이 아닙니다.",true),
    STUDY_CLASS_ANSWER_NOT_FOUND(HttpStatus.FORBIDDEN,"존재하지 않는 반 문항별 정답률 ID",true),
    STUDY_STUDENT_ENTER(HttpStatus.OK,"학습 재입장 완료",true);


    private final String message;
    private final HttpStatus status;
    private final boolean isNotify;

    StudyErrorCode(HttpStatus status, String message, boolean isNotify) {
        this.message = message;
        this.status = status;
        this.isNotify = isNotify;
    }

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
