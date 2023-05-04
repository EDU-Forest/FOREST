package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.User;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserWorkbookRepository extends JpaRepository<UserWorkbook, Long> {

    Page<UserWorkbook> findAllByUserAndWorkbookIsPublicIsTrueAndWorkbookIsDeployIsTrueAndIsBookmarkedIsTrueOrIsScrapedIsTrue(User user, Pageable pageable);
    int countByWorkbookIdAndIsBookmarkedIsTrue(Long workbookId);
    int countByWorkbookIdAndIsScrapedIsTrue(Long workbookId);
    Optional<UserWorkbook> findByUserIdAndWorkbookId(Long userId, Long workbookId);
    Optional<Boolean> findByUserIdAndWorkbookIdAndIsBookmarkedIsTrue(Long userId, Long workbookId);
    List<UserWorkbook> findAllByWorkbookId(Long workbookId);

}
