package com.ssafy.forestauth.controller;

import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.msg.SelectCheeringMsgResponseDto;
import com.ssafy.forestauth.service.CheeringMsgService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("Cheering Controller V1")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/msg")
public class CheeringMsgController {

    private final CheeringMsgService cheeringMsgService;

    @GetMapping("")
    public ResponseEntity<ResponseSuccessDto<SelectCheeringMsgResponseDto>> selectMsg() {
        return ResponseEntity.ok(cheeringMsgService.selectMsg());
    }
}
