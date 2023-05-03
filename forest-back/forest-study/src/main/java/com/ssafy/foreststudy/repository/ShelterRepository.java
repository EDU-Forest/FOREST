package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.canvas.Line;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ShelterRepository extends JpaRepository<Line, Long> {

}
