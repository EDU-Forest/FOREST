package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.ClassStudyResult;
import com.ssafy.foreststudy.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface ClassStudyResultRepository extends JpaRepository<ClassStudyResult, Long> {


    @Query("select cs from ClassStudyResult cs where cs.study.classes.id = :classId and DATEDIFF(now(), cs.study.endTime) > 0 order by cs.study.endTime desc ")
    ClassStudyResult findAllByClassIdOrderByEndTime(Long classId);

    Optional<ClassStudyResult> findAllByStudy(Study study);
}
