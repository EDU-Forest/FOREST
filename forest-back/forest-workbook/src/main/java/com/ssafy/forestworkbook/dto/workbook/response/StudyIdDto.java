package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StudyIdDto {

    private Long studyId;

    @Builder
    public StudyIdDto(Long studyId) {
        this.studyId = studyId;
    }
}
