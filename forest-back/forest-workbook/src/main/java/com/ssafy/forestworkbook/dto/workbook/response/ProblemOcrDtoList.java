package com.ssafy.forestworkbook.dto.workbook.response;

import com.ssafy.forestworkbook.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ProblemOcrDtoList {

    private List<ProblemOcrDto> problemList;

    public ProblemOcrDtoList(List<ProblemOcrDto> problemList) {
        this.problemList = problemList;
    }
}
