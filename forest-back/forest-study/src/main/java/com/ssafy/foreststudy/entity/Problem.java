package com.ssafy.foreststudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.foreststudy.enumeration.EnumProblemTypeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", nullable = false)
    private ProblemImg image;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "varchar(10)", nullable = false)
    private EnumProblemTypeStatus type;

    @Column(name = "title", columnDefinition = "varchar(30)", nullable = false)
    private String title;

    @Column(name = "text", columnDefinition = "varchar(255)")
    private String text;

    @Column(name = "answer", columnDefinition = "varchar(100)", nullable = false)
    private String answer;

    @Column(name = "point", columnDefinition = "int", nullable = false)
    private int point;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
