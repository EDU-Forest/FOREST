package com.ssafy.foreststudy.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.foreststudy.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Slf4j
@RequiredArgsConstructor
@Service
public class LineService {

    LineRepository lineRepository;


    public String selectUser(String name){

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            if (lineRepository.findByName(name) == null) {
                log.info("[Service] author : {} not exist!!", name);
                return String.format("author : %s not exist!!", name);
            } else {
                return objectMapper.writeValueAsString(lineRepository.findByName(name));
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}