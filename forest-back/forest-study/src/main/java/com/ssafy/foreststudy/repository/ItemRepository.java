package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.Item;
import com.ssafy.foreststudy.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByProblem(Problem problem);
}
