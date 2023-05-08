package com.ssafy.forestworkbook.dto.workbook.response;

import com.ssafy.forestworkbook.entity.WorkbookImg;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ImgDto {

    private Long workbookImgId;
    private String workbookImgPath;

    @Builder
    public ImgDto(Long workbookImgId, String workbookImgPath) {
        this.workbookImgId = workbookImgId;
        this.workbookImgPath = workbookImgPath;
    }
}
