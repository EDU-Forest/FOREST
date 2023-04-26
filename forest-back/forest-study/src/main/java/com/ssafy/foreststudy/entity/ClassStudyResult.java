package com.ssafy.foreststudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private int takeRate;

    /* double? decimal? */
    @Column(name = "average", columnDefinition = "double")
    private double average;

    @Column(name = "standard_deviation", columnDefinition = "double")
    private double standardDeviation;

    @Column(name = "average_solving_time", columnDefinition = "timestamp")
    private LocalDateTime averageSolvingTime;

    @Column(name = "correct_answer_rate", columnDefinition = "int")
    private int correctAnswerRate;

    @Column(name = "total_student", columnDefinition = "int")
    private int totalStudent;

    @Column(name = "participant_student", columnDefinition = "int")
    private int participantStudent;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
