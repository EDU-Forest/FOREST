package com.ssafy.forestworkbook.enumeration.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ForestStatus {

    WORKBOOK_SUCCESS_GET_LIST(HttpStatus.OK),
    WORKBOOK_SUCCESS_COPY(HttpStatus.CREATED),
    WORKBOOK_SUCCESS_CREATE(HttpStatus.CREATED),
    WORKBOOK_SUCCESS_UPDATE(HttpStatus.NO_CONTENT),
    WORKBOOK_SUCCESS_CHANGE_ISPUBLIC(HttpStatus.NO_CONTENT),
    WORKBOOK_SUCCESS_GET_EXPORT_INFO(HttpStatus.OK),
    WORKBOOK_SUCCESS_DEPLOY(HttpStatus.NO_CONTENT),
    WORKBOOK_SUCCESS_ADD_BOOKMARK(HttpStatus.CREATED),
    WORKBOOK_SUCCESS_DELETE_BOOKMARK(HttpStatus.NO_CONTENT),
    WORKBOOK_SUCCESS_DELETE_WORKBOOK(HttpStatus.NO_CONTENT),
    ;

    private final HttpStatus status;

    ForestStatus(HttpStatus status) {
        this.status = status;
    }
}
