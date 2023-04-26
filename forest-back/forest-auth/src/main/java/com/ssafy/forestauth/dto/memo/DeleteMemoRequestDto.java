package com.ssafy.forestauth.dto.memo;

import lombok.Getter;

@Getter
public class DeleteMemoRequestDto {
    private Long memoId;
    private Boolean isDeleted;
}
