package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.ProblemList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProblemListRepository extends JpaRepository<ProblemList, Long> {

    List<ProblemList> findAllByWorkbookId(Long workbookId);
    Optional<ProblemList> findByProblemIdAndWorkbookId(Long problemId, Long workbookId);
    Optional<ProblemList> findTop1ByProblemId(Long problemId);

}
