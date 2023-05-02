package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface StudentStudyProblemResultRepository extends JpaRepository<StudentStudyProblemResult, Long> {

    List<StudentStudyProblemResult> findAllByStudyAndUser(Study study, User user);

    List<StudentStudyProblemResult> findAllByStudyAndProblemListOrderByIdAsc(Study study, ProblemList problemList);

    Optional<StudentStudyProblemResult> findAllByStudyAndUserAndProblemList(Study study, User user, ProblemList problemList);


}
