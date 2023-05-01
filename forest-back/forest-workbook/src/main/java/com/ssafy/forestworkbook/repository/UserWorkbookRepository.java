package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.User;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserWorkbookRepository extends JpaRepository<UserWorkbook, Long> {

    Page<UserWorkbook> findAllByUserAndIsBookmarkedIsTrue(User user, Pageable pageable);
    int countByWorkbookIdAndIsBookmarked(Long workbookId, Boolean isBookmarked);
    int countByWorkbookIdAndIsScraped(Long workbookId, boolean isScraped);

}
