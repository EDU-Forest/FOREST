package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.User;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserWorkbookRepository extends JpaRepository<UserWorkbook, Long> {

    @Query (value = "select uw from UserWorkbook uw " +
            "join fetch  uw.workbook w " +
            "where uw.user.id = :userId and w.isPublic is true and " +
            "(uw.isBookmarked is true or uw.isScraped is true) " +
            "order by w.updatedDate desc",
            countQuery = "select count(uw) from UserWorkbook uw where uw.user.id = :userId")
    Page<UserWorkbook> findAllByUserIdANdWorkbookIdAndIsBookmarkedOrIsScraped(Long userId, Pageable pageable);
    int countByWorkbookIdAndIsBookmarkedIsTrue(Long workbookId);
    int countByWorkbookIdAndIsScrapedIsTrue(Long workbookId);
    Optional<UserWorkbook> findByUserIdAndWorkbookId(Long userId, Long workbookId);
    Optional<Boolean> findByUserIdAndWorkbookIdAndIsBookmarkedIsTrue(Long userId, Long workbookId);
    List<UserWorkbook> findAllByWorkbookId(Long workbookId);

}
