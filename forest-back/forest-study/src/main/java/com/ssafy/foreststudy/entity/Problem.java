package com.ssafy.foreststudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.foreststudy.enumeration.EnumProblemTypeStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "problems")
@Where(clause = "is_deleted = false")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @Column(name = "path", columnDefinition = "varchar(255)")
    private String path;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "varchar(10)", nullable = false)
    private EnumProblemTypeStatus type;

    @Column(name = "title", columnDefinition = "text", nullable = false)
    private String title;

    @Column(name = "text", columnDefinition = "text")
    private String text;

    @Column(name = "answer", columnDefinition = "text", nullable = false)
    private String answer;

    @Column(name = "point", columnDefinition = "int", nullable = false)
    private int point;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
