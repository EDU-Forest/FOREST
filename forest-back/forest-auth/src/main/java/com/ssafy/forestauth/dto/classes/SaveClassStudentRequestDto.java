package com.ssafy.forestauth.dto.classes;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class SaveClassStudentRequestDto {
    @NotNull(message = "classId는 필수 값입니다!!")
    private Long classId;
    private List<SaveClassStudentIdRequestDto> studentList;
}
