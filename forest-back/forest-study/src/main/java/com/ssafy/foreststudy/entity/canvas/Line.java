package com.ssafy.foreststudy.entity.canvas;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Document(collection = "canvas")
@Getter
@NoArgsConstructor
public class Line {

    @Id
    private String id;

    private String title;

    private String author;

    private String copies;

    public Line(String id, String title, String author, String copies) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.copies = copies;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getCopies() {
        return copies;
    }
}
