package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
public class PostStartStudyResponseDto {

    private String message;
}