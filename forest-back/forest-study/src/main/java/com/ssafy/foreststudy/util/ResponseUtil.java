package com.ssafy.foreststudy.util;


import com.ssafy.foreststudy.dto.common.response.ErrorContentDto;
import com.ssafy.foreststudy.dto.common.response.ResponseErrorDto;
import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.enumeration.response.ErrorCode;
import com.ssafy.foreststudy.enumeration.response.SuccessCode;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.TimeZone;

@Component
public class ResponseUtil<T> {
    public ResponseSuccessDto<T> successResponse(T data, SuccessCode status) {
        ResponseSuccessDto<T> res = ResponseSuccessDto
                .<T>builder()
                .timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("Asia/Seoul").toZoneId()))
                .code(HttpStatus.OK.value())
                .status(status.name())
                .data(data)
                .build();
        return res;
    }

    public ResponseErrorDto<ErrorContentDto> buildErrorResponse(ErrorCode errorCode, String path) {
        ErrorContentDto errorContentDto = ErrorContentDto.builder()
                .message(errorCode.getMessage())
                .build();

        return ResponseErrorDto
                .<ErrorContentDto>builder()
                .timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("Asia/Seoul").toZoneId()))
                .code(errorCode.getStatus().value())
                .status(errorCode.getStatus().name())
                .path(path)
                .error(errorContentDto)
                .build();
    }

}
