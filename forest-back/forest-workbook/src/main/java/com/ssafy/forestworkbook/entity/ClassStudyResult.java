package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "class_study_results")
@Where(clause = "is_deleted = false")
public class ClassStudyResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "study_id", nullable = false)
    private Study study;

    @Column(name = "take_rate", columnDefinition = "int")
    private int takeRate = 0;

    /* double? decimal? */
    @Column(name = "average", columnDefinition = "double")
    private double average = 0;

    @Column(name = "standard_deviation", columnDefinition = "double")
    private double standardDeviation = 0;

    @Column(name = "average_solving_time", columnDefinition = "bigint")
    private Long averageSolvingTime = Long.valueOf(0);

    @Column(name = "correct_answer_rate", columnDefinition = "int")
    private int correctAnswerRate = 0;

    @Column(name = "ungraded_answer_rate", columnDefinition = "int")
    private int ungradedAnswerRate = 0;

    @Column(name = "total_student", columnDefinition = "int")
    private int totalStudent = 0;

    @Column(name = "participant_student", columnDefinition = "int")
    private int participantStudent = 0;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    @Builder
    public ClassStudyResult(Study study) {
        this.study = study;
    }
}