package com.ssafy.forestauth.service;

import com.ssafy.forestauth.repository.ClassRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ClassService {

    private final ResponseUtil responseUtil;
    private final ClassRepository classRepository;
}
