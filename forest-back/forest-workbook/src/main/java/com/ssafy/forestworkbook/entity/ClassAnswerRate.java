package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "class_answer_rates")
@Where(clause = "is_deleted = false")
public class ClassAnswerRate {
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
        @JoinColumn(name = "problem_list_id", nullable = false)
        private ProblemList problemList;

        @Column(name = "correct_rate", columnDefinition = "int default 0", nullable = false)
        private int correctRate;

        @Column(name = "ungraded_rate", columnDefinition = "int default 0", nullable = false)
        private int ungradedRate;

        @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
        private Boolean isDeleted = false;

        @Builder
        public ClassAnswerRate(Study study, ProblemList problemList) {
                this.study = study;
                this.problemList = problemList;
        }
}
