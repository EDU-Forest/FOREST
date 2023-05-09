package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Workbook;
import org.springframework.data.domain.Page;
import com.ssafy.forestworkbook.entity.Study;
import com.ssafy.forestworkbook.enumeration.EnumStudyTypeStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long> {

    List<Study> findAllByClassesIdAndType(Long ClassId, EnumStudyTypeStatus type);
    int countByWorkbook(Workbook workbook);
    Optional<Study> findTop1ByWorkbookId(Long workbookId);

//    @Query (value = "select distinct s.workbook " +
//            "from Study s " +
//            "join fetch s.user u " +
//            "join fetch s.workbook w " +
//            "where s.user.id = :userId",
//            countQuery = "select count(distinct s.workbook) from Study s where s.user.id = :userId",
//            nativeQuery = true)
//    Page<Workbook> findDistinctByWorkbook(Long userId, Pageable pageable);


    @Query (value = "select s from Study s " +
            "join fetch s.user u " +
            "join fetch s.workbook w " +
            "where s.user.id = :userId " +
            "group by s.workbook",
            countQuery = "select count(s) from Study s where s.user.id = :userId")
    Page<Study> findAllByUserGroupByWorkbookId(Long userId, Pageable pageable);

//    @Query (value = "select s from Study s " +
//            "join fetch s.user u " +
//            "where s.user.id = :userId " +
//            "group by s.workbook.id")
//    List<Study> findAllByUserId(Long userId);


}
