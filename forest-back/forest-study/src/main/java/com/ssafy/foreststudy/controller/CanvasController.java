package com.ssafy.foreststudy.controller;

import com.ssafy.foreststudy.service.ShelterService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("Canvas 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/canvas")
public class CanvasController {
    private final ShelterService shelterService;

    @GetMapping("/{title}")
    public String findById(@PathVariable String title){
        System.out.println("test");
        return shelterService.getShelterList(title);
    }
}
