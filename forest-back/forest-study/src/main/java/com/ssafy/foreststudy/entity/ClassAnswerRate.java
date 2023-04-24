package com.ssafy.foreststudy.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "class_answer_rates")
public class ClassAnswerRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id", nullable = false)
    private Study study;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_list_id", nullable = false)
    private ProblemList problemList;

    @Column(name = "correct_rate", columnDefinition = "int default 0", nullable = false)
    private int correctRate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
