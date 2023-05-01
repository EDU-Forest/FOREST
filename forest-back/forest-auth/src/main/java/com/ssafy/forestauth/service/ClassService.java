package com.ssafy.forestauth.service;

import com.ssafy.forestauth.dto.classes.*;
import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.user.SearchStudentResponseDto;
import com.ssafy.forestauth.entity.Class;
import com.ssafy.forestauth.entity.ClassUser;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.forestauth.repository.ClassRepository;
import com.ssafy.forestauth.repository.ClassUserRepository;
import com.ssafy.forestauth.repository.UserRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ClassService {

    private final ResponseUtil responseUtil;
    private final ClassRepository classRepository;
    private final ClassUserRepository classUserRepository;
    private final UserRepository userRepository;

    // 클래스 조회(선생님 or 학생)
    public ResponseSuccessDto<List<SelectClassResponseDto>> selectClass(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        List<SelectClassResponseDto> dtoList = new ArrayList<>();

        // 선생님(관리자)이 클래스 조회
        if (user.getRole().equals(EnumUserRoleStatus.TEACHER)) {
            List<Class> allByOwner = classRepository.findAllByOwner(user);
            for (Class cls : allByOwner) {
                SelectClassResponseDto selectClassResponseDto = SelectClassResponseDto.builder()
                        .classId(cls.getId())
                        .name(cls.getName())
                        .build();
                dtoList.add(selectClassResponseDto);
            }
        }
        // 학생이 클래스 조회
        else {
            List<ClassUser> allByUser = classUserRepository.findAllByUser(user);
            for (ClassUser classUser : allByUser) {
                SelectClassResponseDto selectClassResponseDto = SelectClassResponseDto.builder()
                        .classId(classUser.getClasses().getId())
                        .name(classUser.getClasses().getName())
                        .build();
                dtoList.add(selectClassResponseDto);
            }
        }

        ResponseSuccessDto<List<SelectClassResponseDto>> res = responseUtil.successResponse(dtoList, SuccessCode.AUTH_READ_CLASS_LIST);
        return res;
    }


    // 클래스 이름 중복 검사
    public ResponseSuccessDto<CheckClassResponseDto> checkClassName(String className) {
        Optional<Class> findClass = classRepository.findByName(className);

        SuccessCode successCode;
        if (findClass.isEmpty()) {
            successCode = SuccessCode.AUTH_CLASS_NAME_NOT_DUPLICATED;
        } else {
            successCode = SuccessCode.AUTH_CLASS_NAME_DUPLICATED;
        }

        CheckClassResponseDto checkClassResponseDto = CheckClassResponseDto.builder()
                .message(successCode.getMessage())
                .build();

        ResponseSuccessDto<CheckClassResponseDto> res = responseUtil.successResponse(checkClassResponseDto, successCode);
        return res;
    }

    // 선생님 클래스 추가
    public ResponseSuccessDto<SaveClassResponseDto> saveClass(Long userId, SaveClassRequestDto saveClassRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));
        String className = saveClassRequestDto.getName();

        Class classes = new Class();
        classes.createClass(user, className);
        classRepository.save(classes);


        SaveClassResponseDto saveClassResponseDto = SaveClassResponseDto.builder()
                .message(SuccessCode.AUTH_SAVE_CLASS.getMessage())
                .build();

        ResponseSuccessDto<SaveClassResponseDto> res = responseUtil.successResponse(saveClassResponseDto, SuccessCode.AUTH_SAVE_CLASS);
        return res;
    }

    // 클래스에 학생 추가
    public ResponseSuccessDto<SaveClassStudentResponseDto> saveClassStudent(SaveClassStudentRequestDto saveClassStudentRequestDto) {
        Long classId = saveClassStudentRequestDto.getClassId();
        Class findClass = classRepository.findById(classId).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_CLASS_NOT_FOUND));

        List<Long> studentList = saveClassStudentRequestDto.getStudentList();
        for (Long studentId : studentList) {
            User student = userRepository.findById(studentId).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));
            ClassUser classUser = new ClassUser();
            classUser.createClassUser(findClass, student);
            classUserRepository.save(classUser);
        }

        SaveClassStudentResponseDto saveClassStudentResponseDto = SaveClassStudentResponseDto.builder()
                .message(SuccessCode.AUTH_STUDENT_INSERTED_CLASS.getMessage())
                .build();

        ResponseSuccessDto<SaveClassStudentResponseDto> res = responseUtil.successResponse(saveClassStudentResponseDto, SuccessCode.AUTH_STUDENT_INSERTED_CLASS);
        return res;
    }

    public ResponseSuccessDto<List<SearchStudentResponseDto>> searchStudent(Long classId) {
        Class findClass = classRepository.findById(classId).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_CLASS_NOT_FOUND));
        List<ClassUser> findUserClassList = classUserRepository.findAllByClasses(findClass);

        List<SearchStudentResponseDto> dtoList = new ArrayList<>();
        for (ClassUser classUser : findUserClassList) {
            User user = classUser.getUser();
            int age = LocalDate.now().getYear() - user.getBirth().getYear();
            SearchStudentResponseDto searchStudentResponseDto = SearchStudentResponseDto.builder()
                    .userId(user.getId())
                    .name(user.getName())
                    .age(age)
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .build();
            dtoList.add(searchStudentResponseDto);
        }

        ResponseSuccessDto<List<SearchStudentResponseDto>> res = responseUtil.successResponse(dtoList, SuccessCode.AUTH_SEARCH_STUDENT);
        return res;
    }

    public ResponseSuccessDto<DeleteStudentResponseDto> deleteStudent(DeleteStudentRequestDto deleteStudentRequestDto) {
        Long classId = deleteStudentRequestDto.getClassId();
        Long userId = deleteStudentRequestDto.getUserId();

        Class findClass = classRepository.findById(classId).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_CLASS_NOT_FOUND));
        User findUser = userRepository.findById(userId).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_USER_NOT_FOUND));

        ClassUser classUser = classUserRepository.findByClassesAndUser(findClass, findUser).orElseThrow(() -> new EntityIsNullException(ErrorCode.AUTH_CLASS_USER_NOT_FOUND));
        classUser.deleteClassUser();

        DeleteStudentResponseDto deleteStudentResponseDto = DeleteStudentResponseDto.builder()
                .message(SuccessCode.AUTH_STUDENT_EXCLUDED.getMessage())
                .build();

        ResponseSuccessDto<DeleteStudentResponseDto> res = responseUtil.successResponse(deleteStudentResponseDto, SuccessCode.AUTH_STUDENT_EXCLUDED);
        return res;
    }
}