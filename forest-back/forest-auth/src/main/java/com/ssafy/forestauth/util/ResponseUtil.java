package com.ssafy.forestauth.util;


import com.ssafy.forestauth.dto.common.response.ErrorContentDto;
import com.ssafy.forestauth.dto.common.response.ResponseErrorDto;
import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.TimeZone;

@Component
public class ResponseUtil<T> {
    public ResponseSuccessDto<T> successResponse(T data, SuccessCode status) {
        ResponseSuccessDto<T> res = ResponseSuccessDto
                .<T>builder()
                .timeStamp(ZonedDateTime.now(TimeZone.getTimeZone("Asia/Seoul").toZoneId()))
                .code(status.getStatus().value())
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
