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
@Table(name = "student_study_problem_results")
@Where(clause = "is_deleted = false")
public class StudentStudyProblemResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "study_id", nullable = false)
    private Study study;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "problem_list_id", nullable = false)
    private ProblemList problemList;

    @Column(name = "user_answer", columnDefinition = "varchar(255)")
    private String userAnswer;

    @Column(name = "part_point", columnDefinition = "int default 0", nullable = false)
    private int partPoint;

    @Column(name = "is_corrected", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isCorrected = false;

    @Column(name = "is_graded", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isGraded = false;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    public void createStudentStudyProblemResult(Study study, User user, ProblemList problemList) {
        this.study = study;
        this.user = user;
        this.problemList = problemList;
    }

    public void updateStudentStudyProblemResult(String userAnswer, int partPoint, Boolean isCorrected, Boolean isGraded){
        this.userAnswer = userAnswer;
        this.partPoint = partPoint;
        this.isCorrected = isCorrected;
        this.isGraded = isGraded;
    }

    public void updateDescript(int partPoint, Boolean isCorrected, Boolean isGraded){
        this.partPoint = partPoint;
        this.isCorrected = isCorrected;
        this.isGraded = isGraded;
    }
}
