package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StudentStudyProblemResultRepository extends JpaRepository<StudentStudyProblemResult, Long> {

    List<StudentStudyProblemResult> findAllByStudyAndUser(Study study, User user);

    StudentStudyProblemResult findAllByStudyAndUserAndProblemList(Study study, User user, ProblemList problemList);


}
