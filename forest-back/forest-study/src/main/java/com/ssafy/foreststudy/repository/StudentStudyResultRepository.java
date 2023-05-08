package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.StudentStudyResult;
import com.ssafy.foreststudy.entity.Study;
import com.ssafy.foreststudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface StudentStudyResultRepository extends JpaRepository<StudentStudyResult, Long> {
    @Query("select ssr from StudentStudyResult ssr where ssr.study = :study  order by ssr.user.name asc ")
    List<StudentStudyResult> findAllByStudy(Study study);
    Optional<StudentStudyResult> findAllByStudyAndUser(Study study, User user);
    Optional<StudentStudyResult> findAllById(Long id);
}
