package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Study;
import com.ssafy.forestworkbook.entity.Workbook;
import com.ssafy.forestworkbook.enumeration.EnumStudyTypeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long> {

    List<Study> findAllByClassesIdAndTypeOrderByEndTimeDesc(Long ClassId, EnumStudyTypeStatus type);
    Optional<Study> findTop1ByWorkbookId(Long workbookId);

    @Query (value = "select s from Study s " +
            "join fetch s.user u " +
            "join fetch s.workbook w " +
            "where s.user.id = :userId " +
            "group by s.workbook " +
            "order by w.updatedDate desc ",
            countQuery = "select count(s) from Study s where s.user.id = :userId")
    Page<Study> findAllByUserGroupByWorkbookId(Long userId, Pageable pageable);

    @Query (value = "select count(t.workbook_id) " +
            "from (select * from studies where workbook_id = :workbookId group by class_id) t", nativeQuery = true)
    int countByWorkbookGroupByWorkbook(Long workbookId);

}
