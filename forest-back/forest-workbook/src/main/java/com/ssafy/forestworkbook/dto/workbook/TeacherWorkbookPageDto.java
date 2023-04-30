package com.ssafy.forestworkbook.dto.workbook;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.forestworkbook.dto.common.response.ResponsePageDto;
import org.springframework.data.domain.Page;

import java.util.List;

public class TeacherWorkbookPageDto<T> extends ResponsePageDto {

    private final Page<T> page;

    public TeacherWorkbookPageDto(Page<T> page) {
        super(page);
        this.page = page;
    }

    @JsonProperty("workbookList")
    public List<T> getContent() {
        return this.page.getContent();
    }
}
