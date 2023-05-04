package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.canvas.Line;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface LineRepository extends MongoRepository<Line, String> {

    List<Line> findByNameRegex(String name);

}
