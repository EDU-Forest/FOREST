package com.ssafy.foreststudy.entity.canvas;


import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "canvas")
@Getter
@NoArgsConstructor
public class Path {
    private Double x;
    private Double y;
}
