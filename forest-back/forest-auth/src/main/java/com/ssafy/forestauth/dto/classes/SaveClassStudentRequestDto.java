package com.ssafy.forestauth.dto.classes;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class SaveClassStudentRequestDto {
    private String classId;
    private List<Long> studentList;
}
