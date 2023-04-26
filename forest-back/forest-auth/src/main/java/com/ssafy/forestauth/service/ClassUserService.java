package com.ssafy.forestauth.service;

import com.ssafy.forestauth.repository.ClassUserRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ClassUserService {

    private final ResponseUtil responseUtil;
    private final ClassUserRepository classUserRepository;
}
