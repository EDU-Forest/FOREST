package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.dto.workbook.response.BestWorkbookDto;

import java.util.List;

public interface WorkbookCustomRepository {

    List<BestWorkbookDto> findTop20ByIsBookmarkedBestWorkbook();
    List<BestWorkbookDto> findTop20ByIsScrapedBestWorkbook();

}
