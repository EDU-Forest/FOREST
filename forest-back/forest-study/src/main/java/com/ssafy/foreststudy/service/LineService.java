package com.ssafy.foreststudy.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.foreststudy.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Slf4j
@RequiredArgsConstructor
@Component
public class LineService {

    @Autowired
    LineRepository lineRepository;


    public String selectUser(String author){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (lineRepository.findByAuthor(author) == null) {
                log.info("[Service] author : {} not exist!!", author);
                return String.format("author : %s not exist!!", author);
            } else {
                return objectMapper.writeValueAsString(lineRepository.findByAuthor(author));
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}