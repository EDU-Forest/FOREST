package com.ssafy.forestworkbook.dto.common.response;

import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSuccessDto<T> extends ResponseCommonDto {

    private T data;

    @Builder
    public ResponseSuccessDto(ZonedDateTime timeStamp, int code, String status, T data){
        super(timeStamp, code, status);
        this.data = data;
    }
}
