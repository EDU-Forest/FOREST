package com.ssafy.foreststudy.entity.canvas;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Document(collection = "member")
@Data
@NoArgsConstructor
public class Line {
    @Id
    private ObjectId id;
    private String name;
    private String phoneNm;
    private String add;
}
