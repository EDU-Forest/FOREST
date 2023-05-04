package com.ssafy.foreststudy.entity.canvas;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.List;

@Document(collection = "canvas")
@Getter
@NoArgsConstructor
public class Canvas {
    @Id
    private Long studentStudyProblemId;
    private List<Line> line;
}
