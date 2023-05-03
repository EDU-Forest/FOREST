package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.canvas.Line;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ShelterRepository extends JpaRepository<Line, Long> {

    Optional<Line> findById(Long id);
}
