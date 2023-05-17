package com.ssafy.foreststudy.controller;

import com.ssafy.forest.jwt.JwtDecoder;
import com.ssafy.foreststudy.dto.canvas.GetCanvasResponseDto;
import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.PostResponseDto;
import com.ssafy.foreststudy.service.CanvasService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@Api("Canvas 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/canvas")
public class CanvasController {
    private final CanvasService canvasService;
    private final JwtDecoder jwtDecoder;

    @ApiOperation(value = "캔버스 풀이 저장", notes = "캔버스 풀이를 저장합니다.")
    @PostMapping()
    public ResponseEntity<ResponseSuccessDto<PostResponseDto>> postCanvas(HttpServletRequest request, @RequestBody @Valid GetCanvasResponseDto getCanvasResponseDto) throws UnsupportedEncodingException {
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(canvasService.postCanvas(getCanvasResponseDto,userId));
    }

    @ApiOperation(value = "캔버스 풀이 조회", notes = "캔버스 풀이를 조회합니다.")
    @GetMapping("/{studentStudyProblemId}")
    public ResponseEntity<ResponseSuccessDto<GetCanvasResponseDto>> getCanvas(HttpServletRequest request, @PathVariable("studentStudyProblemId") Long studentStudyProblemId) throws UnsupportedEncodingException {
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(canvasService.getCanvas(studentStudyProblemId,userId));
    }
}
