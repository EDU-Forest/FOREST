package com.ssafy.foreststudy.dto.study;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class PatchExitStudyRequestDto {
    @NotNull
    private Long studyId;
}
