package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.canvas.Line;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface LineRepository extends MongoRepository<Line, String> {

    Line findByName(String name);
}
