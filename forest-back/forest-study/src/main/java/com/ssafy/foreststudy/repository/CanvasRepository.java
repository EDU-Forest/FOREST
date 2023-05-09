package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.canvas.Canvas;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface CanvasRepository extends MongoRepository<Canvas, String> {

    Optional<Canvas> findAllByStudentStudyProblemId(Long studentStudyProblemId);

    void deleteCanvasByStudentStudyProblemId(Long studentStudyProblemId);
}
