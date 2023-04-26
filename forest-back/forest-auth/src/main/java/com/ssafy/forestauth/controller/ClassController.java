package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.service.ClassService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("Auth Controller V1")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/class")
public class ClassController {

    private final ClassService classService;
}
