package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Workbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkbookRepository extends JpaRepository<Workbook, Long>, WorkbookCustomRepository {

    Page<Workbook> findAllByCreatorIdOrderByUpdatedDateDesc(Long UserId, Pageable pageable);
    List<Workbook> findAllByCreatorIdOrderByUpdatedDateDesc(Long UserId);
    List<Workbook> findTop20ByIsPublicIsTrueOrderByCreatedDateDesc();
    List<Workbook> findAllByIsPublicIsTrueAndTitleContainingOrderByCreatedDateDesc(String search);

}
