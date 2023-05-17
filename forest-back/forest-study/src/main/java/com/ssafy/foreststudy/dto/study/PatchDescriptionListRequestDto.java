package com.ssafy.foreststudy.dto.study;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class PatchDescriptionListRequestDto {
    @NotNull
    private Long problemListId;

    @NotNull
    private Long studyId;

    @NotNull
    private int point;

    @NotNull
    private Boolean isLast;

    private List<GetStudentPointListResponseDto> studentPointList;
}
