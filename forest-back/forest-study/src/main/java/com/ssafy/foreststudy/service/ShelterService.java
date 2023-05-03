package com.ssafy.foreststudy.service;

import com.ssafy.foreststudy.entity.canvas.Line;
import com.ssafy.foreststudy.repository.ShelterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShelterService {
    private final ShelterRepository shelterRepository;
    public String getShelterList(Long id) {
        Optional<Line> line = shelterRepository.findById(id);
        String a = line.get().getAuthor();
        System.out.println("test");
        return a;
    }
}