package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Study;
import com.ssafy.forestworkbook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {

    List<Study> findAllByClassesId(Long ClassId);

}
