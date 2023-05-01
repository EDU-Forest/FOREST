package com.ssafy.foreststudy.dto.study;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetDescriptionListResponseDto {
    private int count;
    private List<GetDescriptionResponseDto> descript;
}
