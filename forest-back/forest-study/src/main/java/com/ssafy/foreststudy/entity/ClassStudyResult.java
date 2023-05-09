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

    @Column(name = "average_solving_time", columnDefinition = "bigint")
    private Long averageSolvingTime;

    @Column(name = "correct_answer_rate", columnDefinition = "int")
    private int correctAnswerRate;

    @Column(name = "ungraded_answer_rate", columnDefinition = "int")
    private int ungradedAnswerRate;

    @Column(name = "total_student", columnDefinition = "int")
    private int totalStudent;

    @Column(name = "participant_student", columnDefinition = "int")
    private int participantStudent;

    @Column(name = "is_finished", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isFinished = false;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    public void createClassStudyResult(Study study, int takeRate, double average, double standardDeviation, Long averageSolvingTime, int correctAnswerRate, int ungradedAnswerRate, int totalStudent, int participantStudent) {
        this.study = study;
        this.takeRate = takeRate;
        this.average = average;
        this.standardDeviation = standardDeviation;
        this.averageSolvingTime = averageSolvingTime;
        this.correctAnswerRate = correctAnswerRate;
        this.ungradedAnswerRate = ungradedAnswerRate;
        this.totalStudent = totalStudent;
        this.participantStudent = participantStudent;
        this.isFinished = true;
    }

    public void updateClassStudyResult(Study study,  double average, double standardDeviation, int correctAnswerRate) {
        this.study = study;
        this.average = average;
        this.standardDeviation = standardDeviation;
        this.correctAnswerRate = correctAnswerRate;
        this.ungradedAnswerRate = 0;
    }
}
