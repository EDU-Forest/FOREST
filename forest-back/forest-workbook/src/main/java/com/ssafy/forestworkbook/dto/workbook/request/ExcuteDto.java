package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ExcuteDto {

    private Long workbookId;
    private Long classId;
    private String type;
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;


}
