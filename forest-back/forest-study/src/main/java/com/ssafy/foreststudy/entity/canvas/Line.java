package com.ssafy.foreststudy.entity.canvas;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Document(collection = "line")
@Data
@NoArgsConstructor
public class Line {
    @Id
    private Long id;
    private String name;
    private String email;
}
