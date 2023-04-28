package com.ssafy.forestworkbook.service.impl;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.TeacherWorkbookDto;
import com.ssafy.forestworkbook.entity.User;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import com.ssafy.forestworkbook.entity.Workbook;
import com.ssafy.forestworkbook.enumeration.response.ForestStatus;
import com.ssafy.forestworkbook.errorhandling.exception.ErrorCode;
import com.ssafy.forestworkbook.repository.UserRepository;
import com.ssafy.forestworkbook.repository.UserWorkbookRepository;
import com.ssafy.forestworkbook.repository.WorkbookRepository;
import com.ssafy.forestworkbook.service.WorkbookService;
import com.ssafy.forestworkbook.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class WorkbookServiceImpl implements WorkbookService {

    private final UserRepository userRepository;
    private final WorkbookRepository workbookRepository;
    private final UserWorkbookRepository userWorkbookRepository;
    private final ResponseUtil responseUtil;

//    TODO UserID가 어떻게 올까?
    @Override
    public ResponseSuccessDto<Page<TeacherWorkbookDto>> getTeacherWorkbookList(Long userId, String search, Pageable pageable) {
        log.info("{}", pageable.toString());
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.AUTH_USER_NOT_FOUND));
        Page<UserWorkbook> userWorkbooks = userWorkbookRepository.findAllByUserAndIsBookmarkedIsTrue(user, pageable);

        // 좋아하는 문제집
        if(Objects.equals(search, "likes")) {
            UserWorkbook test = userWorkbookRepository.findAllByUser(user);
            UserWorkbook testtest = userWorkbookRepository.findAllByIsBookmarked(true);
            Page<UserWorkbook> userWorkbookss = userWorkbookRepository.findAllByUserAndIsBookmarkedIsTrue(user, pageable);
            log.info("야 어디ㅑㄴ");
            log.info("{}", userWorkbooks.getTotalElements());
            Page<TeacherWorkbookDto> workbookList = userWorkbooks.map(w -> TeacherWorkbookDto.builder()
                    .workbookId(w.getWorkbook().getId())
                    .title(w.getWorkbook().getTitle())
                    .workbookImgPath(w.getWorkbook().getWorkbookImg().getPath())
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarked(w.getWorkbook().getId(), true))
                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScraped(w.getWorkbook().getId(), true))
                    .build());
            log.info("어디까지");
            return responseUtil.successResponse(workbookList, ForestStatus.WORKBOOK_SUCESS_GET_LIST);
        } else if(search.equals("use")) { // 사용한 문제집
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorIdAndIsExecuted(userId, true, pageable);
            Page<TeacherWorkbookDto> workbookList = workbooksToDto(workbooks);
            return responseUtil.successResponse(workbookList, ForestStatus.WORKBOOK_SUCESS_GET_LIST);
        } else if(search.equals("own")) { // 내가 만든 문제집
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorId(userId, pageable);
            Page<TeacherWorkbookDto> workbookList = workbooksToDto(workbooks);
            return responseUtil.successResponse(workbookList, ForestStatus.WORKBOOK_SUCESS_GET_LIST);
        } else {
            throw new CustomException(ErrorCode.WORKBOOK_PARAM_NO_VAILD);
        }
    }

    public Page<TeacherWorkbookDto> workbooksToDto(Page<Workbook> workbooks) {
        Page<TeacherWorkbookDto> workbookList = workbooks.map(w -> TeacherWorkbookDto.builder()
                .workbookId(w.getId())
                .title(w.getTitle())
                .workbookImgPath(w.getWorkbookImg().getPath())
                .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarked(w.getId(), true))
                .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScraped(w.getId(), true))
                .build());
        return  workbookList;
    }
}
