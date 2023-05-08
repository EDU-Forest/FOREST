package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByProblemId(Long problemId);
    Optional<Item> findByProlbemIdAndNo(Long problemId, int no);

}
