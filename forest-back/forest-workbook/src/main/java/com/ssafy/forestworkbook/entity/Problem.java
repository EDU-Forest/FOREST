package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.forestworkbook.enumeration.EnumProblemTypeStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "problems")
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE problems SET is_deleted = true WHERE id = ?")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "varchar(10)", nullable = false)
    private EnumProblemTypeStatus type;

    @Column(name = "title", columnDefinition = "varchar(30)", nullable = false)
    private String title;

    @Column(name = "path", columnDefinition = "varchar(255)")
    private String path;

    @Column(name = "text", columnDefinition = "varchar(255)")
    private String text;

    @Column(name = "answer", columnDefinition = "varchar(100)", nullable = false)
    private String answer;

    @Column(name = "point", columnDefinition = "int", nullable = false)
    private int point;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    @Builder
    public Problem(EnumProblemTypeStatus type, String title, String path, String text, String answer, int point) {
        this.type = type;
        this.title = title;
        this.path = path;
        this.text = text;
        this.answer = answer;
        this.point = point;
    }

    public void updateProblem(String title, String path, String text, String answer, int point) {
        this.title = title;
        this.path = path;
        this.text = text;
        this.answer = answer;
        this.point = point;
    }
}
