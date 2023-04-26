package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.StudentStudyResult;
import com.ssafy.foreststudy.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StudentStudyResultRepository extends JpaRepository<StudentStudyResult, Long> {

    List<StudentStudyResult> findAllByStudy(Study study);
}
