package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.StudentStudyProblemResult;
import com.ssafy.foreststudy.entity.StudentStudyResult;
import com.ssafy.foreststudy.entity.Study;
import com.ssafy.foreststudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StudentStudyProblemResultRepository extends JpaRepository<StudentStudyProblemResult, Long> {

    List<StudentStudyProblemResult> findAllByStudyAndUser(Study study, User user);
}
