package com.ssafy.forestauth.dto.memo;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SelectMemoResponseDto {
    private Long memoId;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
