package com.ssafy.foreststudy.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShelterService {

    public String getShelterList(String title) {
        System.out.println("test");
        return "test 성공";
    }
}