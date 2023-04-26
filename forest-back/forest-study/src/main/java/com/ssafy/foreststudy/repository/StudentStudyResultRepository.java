package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.StudentStudyResult;
import com.ssafy.foreststudy.entity.Study;
import com.ssafy.foreststudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface StudentStudyResultRepository extends JpaRepository<StudentStudyResult, Long> {

    List<StudentStudyResult> findAllByStudy(Study study);
    Optional<StudentStudyResult> findAllByStudyAndUser(Study study, User user);
}
