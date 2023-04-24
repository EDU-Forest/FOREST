package com.ssafy.foreststudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "class_study_results")
public class ClassStudyResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id", nullable = false)
    private Study study;

    @Column(name = "take_rate", columnDefinition = "int")
    private int takeRate;

    /* double? decimal? */
    @Column(name = "average", columnDefinition = "DECIMAL")
    private double average;

    @Column(name = "standard_deviation", columnDefinition = "DECIMAL")
    private double standardDeviation;

    @Column(name = "average_solving_time")
    private LocalDateTime averageSolvingTime;

    @Column(name = "correct_answer_rate", columnDefinition = "int")
    private int correctAnswerRate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
