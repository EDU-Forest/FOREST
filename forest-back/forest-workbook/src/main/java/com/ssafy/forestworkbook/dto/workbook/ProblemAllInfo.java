package com.ssafy.forestworkbook.dto.workbook;

import com.ssafy.forestworkbook.entity.Item;
import com.ssafy.forestworkbook.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ProblemAllInfo {

    private Long problemId;
    private int problemNum;
    private EnumProblemTypeStatus type;
    private String title;
    private String path;
    private String text;
    private String answer;
    private int point;
    private List<ItemDto> itemList;

    @Builder
    public ProblemAllInfo(Long problemId, int problemNum, EnumProblemTypeStatus type, String title, String text, int point, String path, String answer, List<ItemDto> itemList) {
        this.problemId = problemId;
        this.problemNum = problemNum;
        this.type = type;
        this.title = title;
        this.path = path;
        this.text = text;
        this.answer = answer;
        this.point = point;
        this.itemList = itemList;
    }
}
