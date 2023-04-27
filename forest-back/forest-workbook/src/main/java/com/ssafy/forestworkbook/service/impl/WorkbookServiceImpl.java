package com.ssafy.forestworkbook.service.impl;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestworkbook.dto.workbook.TeacherWorkbookDto;
import com.ssafy.forestworkbook.entity.User;
import com.ssafy.forestworkbook.entity.UserWorkbook;
import com.ssafy.forestworkbook.errorhandling.exception.ErrorCode;
import com.ssafy.forestworkbook.repository.UserRepository;
import com.ssafy.forestworkbook.repository.UserWorkbookRepository;
import com.ssafy.forestworkbook.service.WorkbookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class WorkbookServiceImpl implements WorkbookService {

    private final UserRepository userRepository;
    private final UserWorkbookRepository userWorkbookRepository;

//    TODO UserID가 어떻게 올까?
    @Override
    public Page<TeacherWorkbookDto> getTeacherWorkbookList(Long userId, String sort, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.AUTH_USER_NOT_FOUND));
        
        // 좋아하는 문제집
        if(sort.equals("like")) {
            Page<UserWorkbook> userWorkbookList = userWorkbookRepository.findAllByUserIdandAndIsBookmarked(userId, true, pageable);
        } else if(sort.equals("use")) { // 사용한 문제집

        } else if(sort.equals("own")) { // 내가 만든 문제집

        } else {
            throw new CustomException(ErrorCode.WORKBOOK_PARAM_NO_VAILD);
        }
    }
}
