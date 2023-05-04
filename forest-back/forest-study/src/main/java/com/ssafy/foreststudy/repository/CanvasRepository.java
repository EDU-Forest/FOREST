package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.canvas.Canvas;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CanvasRepository extends MongoRepository<Canvas, String> {

    Canvas findAllByStudentStudyProblemId(Long studentStudyProblemId);

    void deleteCanvasByStudentStudyProblemId(Long studentStudyProblemId);
}
