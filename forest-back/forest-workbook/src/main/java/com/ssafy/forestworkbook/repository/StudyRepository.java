package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Workbook;
import org.springframework.data.domain.Page;
import com.ssafy.forestworkbook.entity.Study;
import com.ssafy.forestworkbook.enumeration.EnumStudyTypeStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {

    List<Study> findAllByClassesIdAndType(Long ClassId, EnumStudyTypeStatus type);
    int countByWorkbook(Workbook workbook);

    @Query (value = "select s from Study s " +
            "join fetch s.user u " +
            "join fetch s.workbook w " +
            "where s.user.id = :userId " +
            "group by s.workbook.id",
            countQuery = "select count(s) from Study s where s.user.id = :userId group by s.workbook")
    Page<Study> findAllByUserGroupByWorkbookId(Long userId, Pageable pageable);

    @Query (value = "select s from Study s " +
            "join fetch s.user u " +
            "where s.user.id = :userId " +
            "group by s.workbook.id")
    List<Study> findAllByUserId(Long userId);


}
