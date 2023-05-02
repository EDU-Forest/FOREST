package com.ssafy.forestworkbook.errorhandling.exception;

import com.ssafy.forest.exception.Codable;
import org.springframework.http.HttpStatus;

public enum WorkbookErrorCode implements Codable {

    AUTH_USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "회원 정보를 찾을 수 없습니다.", false),
    WORKBOOK_FAIL_GET_LIST(HttpStatus.BAD_REQUEST, "문제집 목록을 불러올 수 없습니다.", true),
    WORKBOOK_PARAM_NO_VAILD(HttpStatus.BAD_REQUEST, "사용할 수 없는 parameter입니다.", true),
    WORKBOOK_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 문제집입니다.", false),
    WORKBOOK_IMG_NOT_FOUND(HttpStatus.NOT_FOUND, "기본 문제집 이미지가 존재하지 않습니다.", true),
    WORKBOOK_FAIL_COPY(HttpStatus.BAD_REQUEST, "사본을 생성할 수 없는 문제집입니다.", true ),
    WORKBOOK_FAIL_GET_PROBLEM(HttpStatus.NOT_FOUND, "해당하는 문제를 찾을 수 없습니다.", true),
    WORKBOOK_FAIL_GET_PROBLEMLIST(HttpStatus.NOT_FOUND, "문제 목록을 찾을 수 없습니다.", false),
    WORKBOOK_FAIL_UPADATE(HttpStatus.BAD_REQUEST, "문제집 정보를 수정할 수 없습니다", true),
    WORKBOOK_NOT_OWN(HttpStatus.BAD_REQUEST, "내가 만든 문제집만 변경할 수 있습니다.", true),
    WORKBOOK_FAIL_CHANGE_ISPUBLIC(HttpStatus.BAD_REQUEST, "문제집 공개 상태를 변경할 수 없는 문제집입니다.", true),
    WORKBOOK_FAIL_DEPLOY(HttpStatus.BAD_REQUEST, "배포할 수 없는 문제집입니다.", true),
    WORKBOOK_FAIL_ADD_BOOKMARK(HttpStatus.BAD_REQUEST, "북마크를 추가할 수 없는 문제집입니다.", true),
    WORKBOOK_FAIL_GET_USERWORKBOOK(HttpStatus.NOT_FOUND, "기존 북마크 이력을 찾을 수 없습니다.", false),




    ;

    private final String message;
    private final HttpStatus status;
    private final boolean isNotify;

    WorkbookErrorCode(HttpStatus status, String message, boolean isNotify) {
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
