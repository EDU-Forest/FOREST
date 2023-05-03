package com.ssafy.foreststudy.dto.study;

import lombok.Getter;

@Getter
public class GetJaccardSimilarityResponseDto {
    private int similarity;

    public GetJaccardSimilarityResponseDto() {}

    public GetJaccardSimilarityResponseDto(int similarity) {
        this.similarity = similarity;
    }
}
