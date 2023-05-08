package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

}
