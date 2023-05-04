package com.ssafy.foreststudy.service;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.foreststudy.dto.canvas.GetCanvasResponseDto;
import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.PostResponseDto;
import com.ssafy.foreststudy.entity.User;
import com.ssafy.foreststudy.entity.canvas.Canvas;
import com.ssafy.foreststudy.entity.canvas.Line;
import com.ssafy.foreststudy.enumeration.response.SuccessCode;
import com.ssafy.foreststudy.errorhandling.exception.StudyErrorCode;
import com.ssafy.foreststudy.repository.CanvasRepository;
import com.ssafy.foreststudy.repository.UserRepository;
import com.ssafy.foreststudy.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class CanvasService {

    private final ResponseUtil responseUtil;
    private final CanvasRepository canvasRepository;
    private final UserRepository userRepository;

    /* 캔버스 풀이 저장 */
    public ResponseSuccessDto<PostResponseDto> postCanvas(Canvas canvas, Long userId) {

        /* 존재하지 않는 개인 시험 문제 결과 ID 체크 */
//        StudentStudyProblemResult studentStudyProblemResult = studentStudyProblemResultRepository.findAllById(studentStudyProblem.getStudentStudyProblemId())
//                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_PROBLEM_NOT_FOUND));

        Canvas cv = canvasRepository.findAllByStudentStudyProblemId(canvas.getStudentStudyProblemId());
        if (cv != null)
            canvasRepository.deleteCanvasByStudentStudyProblemId(canvas.getStudentStudyProblemId());


        canvasRepository.save(canvas);
        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        PostResponseDto postResponseDto = PostResponseDto.builder()
                .message("캔버스 풀이 저장 완료")
                .build();

        ResponseSuccessDto<PostResponseDto> res = responseUtil.successResponse(postResponseDto, SuccessCode.CANVAS_POST_SUCCESS);
        return res;
    }

    /* 캔버스 풀이 조회 */
    public ResponseSuccessDto<GetCanvasResponseDto> getCanvas(Long studentStudyProblemId, Long userId) {

        /* 존재하지 않는 개인 시험 문제 결과 ID 체크 */
//        StudentStudyProblemResult studentStudyProblemResult = studentStudyProblemResultRepository.findAllById(studentStudyProblem.getStudentStudyProblemId())
//                .orElseThrow(() -> new CustomException(StudyErrorCode.STUDY_STUDENT_RESULT_PROBLEM_NOT_FOUND));

        /* 존재하지 않는 유저 ID 체크 */
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(StudyErrorCode.AUTH_USER_NOT_FOUND));

        Canvas canvas = canvasRepository.findAllByStudentStudyProblemId(studentStudyProblemId);

        GetCanvasResponseDto result = GetCanvasResponseDto.builder()
                .studentStudyProblemId(canvas.getStudentStudyProblemId())
                .line(canvas.getLine())
                .build();

        ResponseSuccessDto<GetCanvasResponseDto> res = responseUtil.successResponse(result, SuccessCode.CANVAS_GET_SUCCESS);
        return res;
    }
}