package com.ssafy.forestworkbook.repository;

import com.querydsl.core.Tuple;
import com.ssafy.forestworkbook.dto.workbook.response.BestWorkbookDto;
import com.ssafy.forestworkbook.entity.Workbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkbookCustomRepository {

    List<BestWorkbookDto> findTop20ByIsBookmarkedBestWorkbook();
    List<BestWorkbookDto> findTop20ByIsScrapedBestWorkbook();
    List<BestWorkbookDto> findTop20ByUpdatedDateWorkbook();

}
