package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProblemListRepository extends JpaRepository<ProblemList, Long> {
    List<ProblemList> findAllByWorkbookOrderByProblemNumAsc(Workbook workbook);

    @Query("select pl from ProblemList pl where pl.workbook = :workbook and pl.problem.type = 'DESCRIPT' ")
    List<ProblemList> findAllByWorkbookAndProblemType(Workbook workbook);
}
