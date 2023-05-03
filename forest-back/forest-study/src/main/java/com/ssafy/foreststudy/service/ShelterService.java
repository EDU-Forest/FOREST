package com.ssafy.foreststudy.service;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.foreststudy.entity.canvas.Line;
import com.ssafy.foreststudy.errorhandling.exception.StudyErrorCode;
import com.ssafy.foreststudy.repository.ShelterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShelterService {
    private final ShelterRepository shelterRepository;
    public String getShelterList(Long id) {
        Line line = shelterRepository.findById(id)
                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));
        String a = line.getClass().getName();
        System.out.println("test");
        return a;
    }
}