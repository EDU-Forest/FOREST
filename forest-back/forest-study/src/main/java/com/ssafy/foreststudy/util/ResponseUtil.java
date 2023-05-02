package com.ssafy.foreststudy.util;


import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.enumeration.response.SuccessCode;
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

}
