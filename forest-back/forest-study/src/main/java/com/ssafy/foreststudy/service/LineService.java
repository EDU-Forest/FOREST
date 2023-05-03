//package com.ssafy.foreststudy.service;
//
//import com.ssafy.forest.exception.CustomException;
//import com.ssafy.foreststudy.entity.canvas.Line;
//import com.ssafy.foreststudy.errorhandling.exception.StudyErrorCode;
//import com.ssafy.foreststudy.repository.LineRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class LineService {
//    private final LineRepository shelterRepository;
//
//    public String getShelterList(String id) {
////        Line line = shelterRepository.findAllById(id)
////                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_NOT_FOUND));
////        String a = line.getAuthor();
////        System.out.println("test");
//
//        return "a";
//    }
//}