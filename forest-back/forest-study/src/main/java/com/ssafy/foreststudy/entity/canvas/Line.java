package com.ssafy.foreststudy.entity.canvas;


import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "canvas")
@Getter
@NoArgsConstructor
public class Line {
    private Boolean drawMode;
    private String strokeColor;
    private Integer strokeWidth;
    private List<Path> paths;
}
