package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class StudyIdListDto {

    private List<StudyIdDto> studyIdList;

    public StudyIdListDto(List<StudyIdDto> studyIdList) {
        this.studyIdList = studyIdList;
    }
}
