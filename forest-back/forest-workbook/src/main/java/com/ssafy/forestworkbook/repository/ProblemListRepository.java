package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.ProblemList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemListRepository extends JpaRepository<ProblemList, Long> {

    List<ProblemList> findAllByWorkbookId(Long workbookId);
}
