package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "problem_lists")
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE problem_lists SET is_deleted = true WHERE id = ?")
public class ProblemList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "workbook_id", nullable = false)
    private Workbook workbook;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Column(name = "problem_num", columnDefinition = "int", nullable = false)
    private int problemNum;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    @Builder
    public ProblemList(Workbook workbook, Problem problem, int problemNum) {
        this.workbook = workbook;
        this.problem = problem;
        this.problemNum = problemNum;
    }

    public void updateProblemNum(int problemNum) {
        this.problemNum = problemNum;
    }

    public void deleteById(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
