package com.ssafy.forestauth.dto.classes;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
public class SaveClassStudentRequestDto {
    @NotNull(message = "classId는 필수 값입니다!!")
    @NotEmpty(message = "classId를 입력해주세요!!")
    private Long classId;
    private List<SaveClassStudentIdRequestDto> studentList;
}
