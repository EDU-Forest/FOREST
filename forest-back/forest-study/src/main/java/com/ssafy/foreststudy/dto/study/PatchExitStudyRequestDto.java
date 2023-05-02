package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
public class PatchExitStudyRequestDto {
    @NotNull
    private Long userId;

    @NotNull
    private Long studyId;
}
