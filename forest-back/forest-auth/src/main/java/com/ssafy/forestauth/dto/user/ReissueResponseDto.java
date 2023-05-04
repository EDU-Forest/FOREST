package com.ssafy.forestauth.dto.user;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReissueResponseDto {
    private String token;
}
