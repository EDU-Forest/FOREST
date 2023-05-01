package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.User;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import com.ssafy.forestworkbook.entity.WorkbookImg;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkbookImgRepository extends JpaRepository<WorkbookImg, Long> {

}
