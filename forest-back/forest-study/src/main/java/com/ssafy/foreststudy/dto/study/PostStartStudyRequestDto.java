package com.ssafy.foreststudy.dto.study;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class PostStartStudyRequestDto {
    @NotNull
    private Long studyId;
}
