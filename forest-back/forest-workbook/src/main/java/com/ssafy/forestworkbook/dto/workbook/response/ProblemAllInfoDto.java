package com.ssafy.forestworkbook.dto.workbook.response;

import com.ssafy.forestworkbook.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ProblemAllInfoDto {

    private Long problemId;
    private int problemNum;
    private EnumProblemTypeStatus type;
    private String title;
    private String problemImgPath;
    private String text;
    private String answer;
    private int point;
    private List<ItemResDto> itemList;

    @Builder
    public ProblemAllInfoDto(Long problemId, int problemNum, EnumProblemTypeStatus type, String title, String text, int point, String problemImgPath, String answer, List<ItemResDto> itemList) {
        this.problemId = problemId;
        this.problemNum = problemNum;
        this.type = type;
        this.title = title;
        this.problemImgPath = problemImgPath;
        this.text = text;
        this.answer = answer;
        this.point = point;
        this.itemList = itemList;
    }
}
