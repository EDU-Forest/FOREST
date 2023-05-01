package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Problem;
import com.ssafy.forestworkbook.entity.ProblemList;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

}
