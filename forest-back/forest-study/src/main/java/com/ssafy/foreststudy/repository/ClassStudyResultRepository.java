package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.ClassStudyResult;
import com.ssafy.foreststudy.entity.Study;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface ClassStudyResultRepository extends JpaRepository<ClassStudyResult, Long> {


    @Query("select cs from ClassStudyResult cs where cs.study.classes.id = :classId and TIMESTAMPDIFF(SECOND ,cs.study.endTime, now())  > 0 order by cs.study.endTime desc ")
    ClassStudyResult findTopByClassIdOrderByEndTime(Long classId);

    @Query("select cs from ClassStudyResult cs where cs.study.classes.id = :classId and cs.study.user.id = :userId and TIMESTAMPDIFF(SECOND,cs.study.endTime, now())  > 0 order by cs.study.endTime desc ")
    List<ClassStudyResult> findTopByClassIdAndUserIdOrderByEndTime(Long classId, Long userId, Pageable pageable);

    Optional<ClassStudyResult> findAllByStudy(Study study);

    default List<ClassStudyResult> findTop1ByClassIdAndUserIdOrderByEndTime(Long classId, Long userId) {
        return findTopByClassIdAndUserIdOrderByEndTime(classId, userId, PageRequest.of(0, 1));
    }

}
