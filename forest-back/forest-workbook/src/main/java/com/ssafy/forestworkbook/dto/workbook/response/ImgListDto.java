package com.ssafy.forestworkbook.dto.workbook.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ImgListDto {

    private List<ImgDto> workbookImgList;

    @Builder
    public ImgListDto(List<ImgDto> workbookImgList) {
        this.workbookImgList = workbookImgList;
    }
}
