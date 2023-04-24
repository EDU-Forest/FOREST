package com.ssafy.foreststudy.util;


import com.ssafy.foreststudy.dto.common.response.ErrorContentDto;
import com.ssafy.foreststudy.dto.common.response.ResponseErrorDto;
import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.enumeration.response.ForestStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.TimeZone;

@Component
public class ResponseUtil<T> {
    public ResponseSuccessDto<T> successResponse(T data, ForestStatus status) {
        ResponseSuccessDto<T> res = ResponseSuccessDto
                .<T>builder()
                .timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("UTC").toZoneId()))
                .code(HttpStatus.OK.value())
                .status(status.name())
                .data(data)
                .build();
        return res;
    }

    public ResponseErrorDto<ErrorContentDto> buildErrorResponse(HttpStatus httpStatus, String message, String path) {
        ErrorContentDto errorContentDto = ErrorContentDto.builder()
                .message(message)
                .build();

        return ResponseErrorDto
                .<ErrorContentDto>builder()
                .timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("UTC").toZoneId()))
                .code(httpStatus.value())
                .status(httpStatus.name())
                .path(path)
                .error(errorContentDto)
                .build();
    }

}
