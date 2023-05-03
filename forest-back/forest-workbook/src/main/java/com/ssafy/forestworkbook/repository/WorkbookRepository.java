package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.UserWorkbook;
import com.ssafy.forestworkbook.entity.Workbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkbookRepository extends JpaRepository<Workbook, Long>, WorkbookCustomRepository {

    Page<Workbook> findAllByCreatorIdAndIsExecuted(Long UserId, boolean isExecuted, Pageable pageable);
    Page<Workbook> findAllByCreatorId(Long UserId, Pageable pageable);
    List<Workbook> findAllByCreatorId(Long UserId);
    List<Workbook> findTop20ByIsPublicIsTrueOrderByCreatedDateDesc();
}
