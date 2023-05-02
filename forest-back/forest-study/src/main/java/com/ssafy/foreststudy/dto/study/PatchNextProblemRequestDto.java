package com.ssafy.foreststudy.dto.study;

import com.ssafy.foreststudy.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
public class PatchNextProblemRequestDto {

    @NotNull
    private Long studentStudyProblemId;

    @NotNull
    private Long userId;

    @NotNull
    private Long studyId;

    private String userAnswer;

    @NotNull
    private EnumProblemTypeStatus type;
}
