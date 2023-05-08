package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByProblemId(Long problemId);

}
