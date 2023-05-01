package com.ssafy.forestworkbook.dto.common.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@JsonPropertyOrder({"content", "pageable", "totalElements", "last", "totalPages", "size", "number", "first", "numberOfElements", "empty"})
public class ResponsePageDto<T> {

    private final Page<T> page;

    public ResponsePageDto(Page<T> page) {
        this.page = page;
    }

    public Pageable getPageable() {
        return page.getPageable();
    }

    public boolean isLast() {
        return page.isLast();
    }

    public long getTotalElements() {
        return page.getTotalElements();
    }

    public int getTotalPages() {
        return page.getTotalPages();
    }

    public int getSize() {
        return page.getSize();
    }

    public int getNumber() {
        return page.getNumber();
    }

    public boolean getFirst() {
        return page.isFirst();
    }

    public int getNumberOfElements() {
        return page.getNumberOfElements();
    }

    public boolean isEmpty() {
        return page.isEmpty();
    }

}
