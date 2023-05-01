package com.ssafy.forestworkbook.enumeration.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ForestStatus {

    WORKBOOK_SUCESS_GET_LIST(HttpStatus.OK),
    WORKBOOK_SUCCESS_COPY(HttpStatus.CREATED),
    WORKBOOK_SUCCESS_CREATE(HttpStatus.CREATED),
    ;

    private final HttpStatus status;

    ForestStatus(HttpStatus status) {
        this.status = status;
    }
}
