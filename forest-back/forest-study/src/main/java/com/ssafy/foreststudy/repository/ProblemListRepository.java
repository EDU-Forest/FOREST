package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemListRepository extends JpaRepository<ProblemList, Long> {
    List<ProblemList> findAllByWorkbook(Workbook workbook);
}
