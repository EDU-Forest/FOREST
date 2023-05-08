package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.ClassAnswerRate;
import com.ssafy.foreststudy.entity.ClassStudyResult;
import com.ssafy.foreststudy.entity.ProblemList;
import com.ssafy.foreststudy.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface ClassAnswerRateRepository extends JpaRepository<ClassAnswerRate, Long> {

    List<ClassAnswerRate> findAllByStudyOrderByProblemListAsc(Study study);
    Optional<ClassAnswerRate> findAllByStudyAndProblemList(Study study, ProblemList problemList);

}
