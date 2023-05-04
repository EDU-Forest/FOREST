package com.ssafy.foreststudy.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.foreststudy.dto.study.PatchResponseDto;
import com.ssafy.foreststudy.entity.canvas.Line;
import com.ssafy.foreststudy.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class LineService {

    private final LineRepository lineRepository;


    public String selectUser(String name){
        System.out.println("line = "+name);
        List<Line> line = lineRepository.findByNameRegex(name);

        System.out.println("line.size() = " + line.size());
//        PatchResponseDto patchExitStudyResponseDto = PatchResponseDto.builder()
//                .message("시험 종료")
//                .build();


//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            if (    lineRepository.findByName(name) == null) {
//                log.info("[Service] author : {} not exist!!", name);
//                return String.format("author : %s not exist!!", name);
//            } else {
//                return objectMapper.writeValueAsString(lineRepository.findByName(name));
//            }
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            return "ERROR";
//        }

        return line.get(0).getAdd();
    }
}