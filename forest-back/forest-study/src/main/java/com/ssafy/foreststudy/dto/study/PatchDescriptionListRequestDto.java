package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Builder
public class PatchDescriptionListRequestDto {
    @NotNull
    private Long problemListId;

    @NotNull
    private Long studyId;

    @NotNull
    private int point;

    private List<GetStudentPointListResponseDto> studentPointList;
}
