package com.ssafy.foreststudy.controller;

import com.ssafy.forest.jwt.JwtDecoder;
import com.ssafy.foreststudy.dto.common.response.ResponseSuccessDto;
import com.ssafy.foreststudy.dto.study.*;
import com.ssafy.foreststudy.service.StudyService;
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
import java.util.List;
import java.util.Map;

@Api("Study 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/study")
public class StudyController {

    private final StudyService studyService;

    @ApiOperation(value = "유저 일정 목록 조회", notes = "유저의 일정 목록을 조회합니다.")
    @GetMapping("/calendar")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetScheduleResponseDto>>>> getScheduleList(HttpServletRequest request) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getScheduleList(userId));
    }

    @ApiOperation(value = "최근 진행한 클래스 시험 결과 조회", notes = "최근 진행한 클래스 시험 결과를 조회합니다.")
    @GetMapping("/recent/{classId}")
    public ResponseEntity<ResponseSuccessDto<GetStudyIdResponseDto>> getStudyRecent(HttpServletRequest request, @PathVariable("classId") Long classId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudyRecent(classId));
    }

    @ApiOperation(value = "시험 결과 조회", notes = "클릭한 클래스 시험 결과를 조회합니다.")
    @GetMapping("/{studyId}")
    public ResponseEntity<ResponseSuccessDto<?>> getStudyResult(HttpServletRequest request, @PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudyResult(studyId));
    }

    @ApiOperation(value = "(클래스) 문항별 정답률 조회", notes = "(클래스) 문항별 정답률을 조회합니다.")
    @GetMapping("/class/result/question/{studyId}")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetStudyResultQuestionResponseDto>>>> getStudyResultQuestion(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudyResultQuestion(studyId));
    }

    @ApiOperation(value = "(클래스) 전체 정답률 조회", notes = "(클래스) 전체 정답률을 조회합니다.")
    @GetMapping("/class/result/all/{studyId}")
    public ResponseEntity<ResponseSuccessDto<GetStudyResultAllResponseDto>> getStudyResultAll(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudyResultAll(studyId));
    }

    @ApiOperation(value = "(클래스) 응시자별 성취도 조회", notes = "(클래스) 응시자별 성취도를 조회합니다.")
    @GetMapping("/class/result/student/{studyId}")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetStudyResultStudentResponseDto>>>> getStudyResultStudent(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudyResultStudent(studyId));
    }

    @ApiOperation(value = "(학생) 문항별 정답 여부 조회", notes = "(학생) 문항별 정답 여부를 조회합니다.")
    @GetMapping("/student/result/question/{studyId}")
    public ResponseEntity<ResponseSuccessDto<Map<String, List<GetStudentResultQuestionResponseDto>>>> getStudentResultQuestion(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudentResultQuestion(studyId, userId));
    }

    @ApiOperation(value = "(학생) 시험 결과 조회", notes = "(학생) 시험 결과를 조회합니다.")
    @GetMapping("/student/result/{studyId}")
    public ResponseEntity<ResponseSuccessDto<GetStudentResultResponseDto>> getStudentResult(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudentResult(studyId, userId));
    }

    @ApiOperation(value = "(학생) 최근 진행한 문제집 성적 조회", notes = "(학생) 최근 진행한 문제집 성적을 조회합니다.")
    @GetMapping("/student/recent/{classId}")
    public ResponseEntity<ResponseSuccessDto<GetStudyIdResponseDto>> getStudentRecent(HttpServletRequest request,@PathVariable("classId") Long classId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudentRecent(classId, userId));
    }

    @ApiOperation(value = "(학생) 선택한 문제집 성적 조회", notes = "(학생) 선택한 문제집 성적을 조회합니다.")
    @GetMapping("/student/{studyId}")
    public ResponseEntity<ResponseSuccessDto<?>> getStudentWorkbookResult(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudentWorkbookResult(studyId, userId));
    }

    @ApiOperation(value = "시험 전체 문제 목록 조회", notes = "시험 전체 문제 목록을 조회합니다.")
    @GetMapping("/problem/{studyId}")
    public ResponseEntity<ResponseSuccessDto<GetProblemResponseDto>> getProblemListAll(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getProblemListAll(studyId,userId));
    }

    @ApiOperation(value = "시험 시작하기", notes = "시험을 시작합니다.")
    @PostMapping("/start")
    public ResponseEntity<ResponseSuccessDto<PostResponseDto>> postStartStudy(HttpServletRequest request,@RequestBody @Valid PostStartStudyRequestDto postStartStudyRequestDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.postStartStudy(postStartStudyRequestDto,userId));
    }

    @ApiOperation(value = "다음 문제 이동하기", notes = "다음 문제로 이동합니다.")
    @PatchMapping("/problem")
    public ResponseEntity<ResponseSuccessDto<PatchResponseDto>> patchNextProblem(HttpServletRequest request,@RequestBody @Valid PatchNextProblemRequestDto patchNextProblemRequestDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.patchNextProblem(patchNextProblemRequestDto, userId));
    }

    @ApiOperation(value = "(학생)시험 종료하기", notes = "(학생) 시험을 종료합니다.")
    @PatchMapping("/exit/student")
    public ResponseEntity<ResponseSuccessDto<PatchResponseDto>> patchExitStudy(HttpServletRequest request,@RequestBody @Valid PatchExitStudyRequestDto patchExitStudyRequestDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.patchExitStudy(patchExitStudyRequestDto, userId));
    }

    @ApiOperation(value = "서술형 문제 채점 목록 조회", notes = "서술형 문제 채점 목록을 조회합니다.")
    @GetMapping("/descript/{studyId}")
    public ResponseEntity<ResponseSuccessDto<GetDescriptionListResponseDto>> getDescriptionList(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getDescriptionList(studyId));
    }

    @ApiOperation(value = "(선생님) 서술형 문제 채점", notes = "(선생님) 서술형 문제를 채점합니다.")
    @PatchMapping("/descript")
    public ResponseEntity<ResponseSuccessDto<PatchResponseDto>> patchExitStudy(HttpServletRequest request,@RequestBody @Valid PatchDescriptionListRequestDto patchDescriptionListRequestDto) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.patchDescription(patchDescriptionListRequestDto));
    }

    @ApiOperation(value = "(클래스) 시험 종료", notes = "시험을 종료합니다.")
    @PostMapping("/exit/{studyId}")
    public ResponseEntity<ResponseSuccessDto<PostResponseDto>> postExitStudy(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.postExitStudy(studyId));
    }

    @ApiOperation(value = "시험 시작하기 정보 조회", notes = "시험 시작하기 정보를 조회합니다.")
    @GetMapping("/info/{studyId}")
    public ResponseEntity<ResponseSuccessDto<GetStudyInfoResponseDto>> getStudyInfo(HttpServletRequest request,@PathVariable("studyId") Long studyId) throws UnsupportedEncodingException {
        JwtDecoder jwtDecoder = new JwtDecoder();
        Long userId = jwtDecoder.verifyJWT(request);
        return ResponseEntity.ok(studyService.getStudyInfo(studyId));
    }
}
