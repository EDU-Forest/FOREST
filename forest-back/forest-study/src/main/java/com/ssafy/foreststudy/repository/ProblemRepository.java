package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

}
