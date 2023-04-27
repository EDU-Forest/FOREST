package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.User;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserWorkbookRepository extends JpaRepository<UserWorkbook, Long> {

    Page<UserWorkbook> findAllByUserIdandAndIsBookmarked(Long UserId, boolean isBookmarked, Pageable pageable);

}
