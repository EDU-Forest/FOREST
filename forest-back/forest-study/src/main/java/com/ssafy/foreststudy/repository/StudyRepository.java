package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {

    @Query("select s from Study s where s.id= :classId")
    List<Study> findAllByClassId(Long classId);
}
