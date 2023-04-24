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
@Table(name = "student_study_results")
public class StudentStudyResult {

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
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "enter_time")
    private LocalDateTime enterTime;

    @Column(name = "exit_time")
    private LocalDateTime exitTime;

    @Column(name = "correct_num", columnDefinition = "int default 0", nullable = false)
    private int correctNum;

    @Column(name = "score", columnDefinition = "int default 0", nullable = false)
    private int score;

    @Column(name = "correct_rate", columnDefinition = "int default 0", nullable = false)
    private int correctRate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
