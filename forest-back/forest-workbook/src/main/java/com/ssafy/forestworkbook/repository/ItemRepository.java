package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Item;
import com.ssafy.forestworkbook.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByProblemIdOrderByNo(Long problemId);
    Optional<Item> findByProblemAndNo(Problem problem, int no);

}
