package com.ssafy.forestworkbook.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.forestworkbook.dto.workbook.response.BestWorkbookDto;
import com.ssafy.forestworkbook.dto.workbook.response.QBestWorkbookDto;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.forestworkbook.entity.QUserWorkbook.userWorkbook;
import static com.ssafy.forestworkbook.entity.QWorkbook.workbook;

public class WorkbookRepositoryImpl implements WorkbookCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public WorkbookRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    public List<BestWorkbookDto> findTop20ByIsBookmarkedBestWorkbook() {
        List<BestWorkbookDto> workbookList = jpaQueryFactory
                .select(new QBestWorkbookDto(workbook.id, workbook.title, workbook.workbookImg.path,
                        workbook.creator.id, userWorkbook.count().intValue()))
                .from(workbook, userWorkbook)
                .where(workbook.id.eq(userWorkbook.workbook.id).and(workbook.isPublic.isTrue())
                                .and(workbook.isDeploy.isTrue()).and(userWorkbook.isBookmarked.isTrue()))
                .groupBy(userWorkbook.workbook.id)
                .orderBy(userWorkbook.count().desc())
                .limit(20)
                .fetch();

        return workbookList;
    }

    public List<BestWorkbookDto> findTop20ByIsScrapedBestWorkbook() {
        List<BestWorkbookDto> workbookList = jpaQueryFactory
                .select(new QBestWorkbookDto(workbook.id, workbook.title, workbook.workbookImg.path,
                        workbook.creator.id, userWorkbook.count().intValue()))
                .from(workbook, userWorkbook)
                .where(workbook.id.eq(userWorkbook.workbook.id).and(workbook.isPublic.isTrue())
                        .and(workbook.isDeploy.isTrue()).and(userWorkbook.isScraped.isTrue()))
                .groupBy(userWorkbook.workbook.id)
                .orderBy(userWorkbook.count().desc())
                .limit(20)
                .fetch();

        return workbookList;
    }

    public List<BestWorkbookDto> findTop20ByUpdatedDateWorkbook() {
        List<BestWorkbookDto> workbookList = jpaQueryFactory
                .select(new QBestWorkbookDto(workbook.id, workbook.title, workbook.workbookImg.path,
                        workbook.creator.id, userWorkbook.count().intValue()))
                .from(workbook, userWorkbook)
                .where(workbook.id.eq(userWorkbook.workbook.id).and(workbook.isPublic.isTrue())
                        .and(workbook.isDeploy.isTrue()).and(userWorkbook.isScraped.isTrue()))
                .groupBy(userWorkbook.workbook.id)
                .orderBy(userWorkbook.count().desc())
                .limit(20)
                .fetch();

        return workbookList;
    }

}
