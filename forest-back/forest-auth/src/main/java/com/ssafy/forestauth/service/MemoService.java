package com.ssafy.forestauth.service;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestauth.dto.memo.*;
import com.ssafy.forestauth.entity.Memo;
import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.enumeration.response.SuccessCode;
import com.ssafy.forestauth.repository.MemoRepository;
import com.ssafy.forestauth.repository.UserRepository;
import com.ssafy.forestauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemoService {

    private final ResponseUtil responseUtil;
    private final MemoRepository memoRepository;
    private final UserRepository userRepository;

    public ResponseSuccessDto<List<SelectMemoResponseDto>> selectMemo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.AUTH_USER_NOT_FOUND));
        List<Memo> memoList = memoRepository.findAllByUserOrderByCreatedDateDesc(user);

        List<SelectMemoResponseDto> memos = new ArrayList<>();
        for (Memo memo : memoList) {
            SelectMemoResponseDto selectMemoResponseDto = SelectMemoResponseDto.builder()
                    .memoId(memo.getId())
                    .content(memo.getContent())
                    .createdDate(memo.getCreatedDate())
                    .updatedDate(memo.getUpdatedDate())
                    .build();
            memos.add(selectMemoResponseDto);
        }

        ResponseSuccessDto<List<SelectMemoResponseDto>> res = responseUtil.successResponse(memos, SuccessCode.AUTH_READ_MEMO);
        return res;
    }

    public ResponseSuccessDto<SaveMemoResponseDto> saveMemo(Long userId, SaveMemoRequestDto saveMemoRequestDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.AUTH_USER_NOT_FOUND));
        Memo memo = new Memo();
        memo.createMemo(user, saveMemoRequestDto);
        memoRepository.save(memo);

        SaveMemoResponseDto saveMemoResponseDto = SaveMemoResponseDto.builder()
                .message(SuccessCode.AUTH_SAVE_MEMO.getMessage())
                .build();
        ResponseSuccessDto<SaveMemoResponseDto> res = responseUtil.successResponse(saveMemoResponseDto, SuccessCode.AUTH_SAVE_MEMO);
        return res;
    }

    public ResponseSuccessDto<DeleteMemoResponseDto> deleteMemo(DeleteMemoRequestDto deleteMemoRequestDto) {
        Long memoId = deleteMemoRequestDto.getMemoId();
        Memo memo = memoRepository.findById(memoId).orElseThrow(() -> new CustomException(ErrorCode.AUTH_MEMO_NOT_FOUND));
        memo.updateDelete(deleteMemoRequestDto.getIsDeleted());
        DeleteMemoResponseDto deleteMemoResponseDto = DeleteMemoResponseDto.builder()
                .message(SuccessCode.AUTH_MEMO_DELETED.getMessage())
                .build();

        ResponseSuccessDto<DeleteMemoResponseDto> res = responseUtil.successResponse(deleteMemoResponseDto, SuccessCode.AUTH_MEMO_DELETED);
        return res;
    }
}
