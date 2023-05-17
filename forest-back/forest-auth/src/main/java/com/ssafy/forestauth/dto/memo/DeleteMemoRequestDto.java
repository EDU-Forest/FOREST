package com.ssafy.forestauth.dto.memo;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class DeleteMemoRequestDto {
    @NotNull(message = "memoId는 필수 값입니다!!")
    private Long memoId;
    @NotNull(message = "memo 삭제 여부는 필수 값입니다!!")
    private Boolean isDeleted;
}
