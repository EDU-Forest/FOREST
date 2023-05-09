package com.ssafy.foreststudy.entity.canvas;

import com.ssafy.foreststudy.entity.ProblemList;
import com.ssafy.foreststudy.entity.Study;
import com.ssafy.foreststudy.entity.User;
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

    public void createCanvas(Long studentStudyProblemId, List<Line> line) {
        this.studentStudyProblemId = studentStudyProblemId;
        this.line = line;
    }
}
