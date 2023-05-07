package com.ssafy.forestworkbook.dto.workbook.request;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ExcuteDto {

    private Long workbookId;
    private List<ClassIdDto> classIdList;
    private String type;
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
