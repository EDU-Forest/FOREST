package com.ssafy.forestworkbook.dto.workbook.response;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.ssafy.forestworkbook.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ProblemOcrDto {

    private EnumProblemTypeStatus type;
    private String title;
    private String problemImgPath;
    private boolean imgIsEmpty;
    private String text;
    private boolean textIsEmpty;
    private int point;
    private List<ItemResExceptIdDto> itemList;

    @Builder
    public ProblemOcrDto(EnumProblemTypeStatus type, String title, String text, boolean textIsEmpty, int point, String problemImgPath, boolean imgIsEmpty, List<ItemResExceptIdDto> itemList) {
        this.type = type;
        this.title = title;
        this.problemImgPath = problemImgPath;
        this.imgIsEmpty = imgIsEmpty;
        this.text = text;
        this.textIsEmpty = textIsEmpty;
        this.point = point;
        this.itemList = itemList;
    }
}
