package com.ssafy.foreststudy.dto.canvas;

import com.ssafy.foreststudy.entity.canvas.Line;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetCanvasResponseDto {
    private Long studentStudyProblemId;
    private List<Line> line;
}
