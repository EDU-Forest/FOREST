package com.ssafy.forestworkbook.util;


import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.enumeration.response.ForestStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.TimeZone;

@Component
public class ResponseUtil<T> {

    public ResponseSuccessDto<T> successResponse(T data, ForestStatus status) {
        ResponseSuccessDto<T> res = ResponseSuccessDto
                .<T>builder()
                .timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("Asia/Seoul").toZoneId()))
                .code(status.getStatus().value())
                .status(status.name())
                .data(data)
                .build();
        return res;
    }

    public ResponseSuccessDto<T> successResponse(ForestStatus status) {
        ResponseSuccessDto<T> res = ResponseSuccessDto
                .<T>builder()
                .timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("Asia/Seoul").toZoneId()))
                .code(status.getStatus().value())
                .status(status.name())
                .build();
        return res;
    }
}

