package com.ssafy.forestworkbook.service.impl;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookTitleDto;
import com.ssafy.forestworkbook.dto.workbook.response.*;
import com.ssafy.forestworkbook.entity.*;
import com.ssafy.forestworkbook.enumeration.response.ForestStatus;
import com.ssafy.forestworkbook.errorhandling.exception.WorkbookErrorCode;
import com.ssafy.forestworkbook.repository.*;
import com.ssafy.forestworkbook.service.WorkbookService;
import com.ssafy.forestworkbook.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class WorkbookServiceImpl implements WorkbookService {

    private final UserRepository userRepository;
    private final WorkbookRepository workbookRepository;
    private final WorkbookImgRepository workbookImgRepository;
    private final UserWorkbookRepository userWorkbookRepository;
    private final ProblemListRepository problemListRepository;
    private final ProblemRepository problemRepository;
    private final ItemRepository itemRepository;
    private final ResponseUtil responseUtil;

//    TODO UserID가 어떻게 올까?
    @Override
    public ResponseSuccessDto<Page<TeacherWorkbookDto>> getTeacherWorkbookList(Long userId, String search, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        // 좋아하는 문제집
        if(Objects.equals(search, "like")) {
            Page<UserWorkbook> userWorkbooks = userWorkbookRepository.findAllByUserAndIsBookmarkedIsTrue(user, pageable);
            Page<TeacherWorkbookDto> workbookList = userWorkbooks.map(w -> TeacherWorkbookDto.builder()
                    .workbookId(w.getWorkbook().getId())
                    .title(w.getWorkbook().getTitle())
                    .workbookImgPath(w.getWorkbook().getWorkbookImg().getPath())
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarked(w.getWorkbook().getId(), true))
                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScraped(w.getWorkbook().getId(), true))
                    .build());
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCESS_GET_LIST);
        }

        // 사용한 문제집
        else if(search.equals("use")) {
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorIdAndIsExecuted(userId, true, pageable);
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = workbooksToDto(workbooks);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCESS_GET_LIST);
        }

        // 내가 만든 문제집
        else if(search.equals("own")) {
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorId(userId, pageable);
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = workbooksToDto(workbooks);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCESS_GET_LIST);
        }

        // 파라미터 입력 오류
        else {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_PARAM_NO_VAILD);
        }
    }

    @Override
    public ResponseSuccessDto<?> copyWorkbook(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        // 1. 문제집 만들기
        Workbook workbook = workbookRepository.findById(workbookId).orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        if (workbook.getCreator().getId() != userId && workbook.getIsPublic() == false)
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_COPY);

        Workbook workbookCopy = Workbook.builder()
                .workbookImg(workbook.getWorkbookImg())
                .creator(workbook.getCreator())
                .title(workbook.getTitle())
                .description(workbook.getDescription())
                .volume(workbook.getVolume())
                .build();

        workbookRepository.save(workbookCopy);

        if (workbookCopy.getCreator().getId() != userId) {
            UserWorkbook userWorkbook = UserWorkbook.builder()
                    .user(user)
                    .workbook(workbookCopy)
                    .build();

            userWorkbookRepository.save(userWorkbook);
        }

        // 2. 문제 만들기
        List<ProblemList> problemLists = problemListRepository.findAllByWorkbookId(workbookId);
        // 문제 복사 리스트
        List<Problem> problems = new ArrayList();
        List<Integer> problemNumList = new ArrayList<>();

        // TODO 트랜잭션이 N개 열리는게 빠를까? N개 for문 두 번, 트랜잭션 2번이 빠를까?
        for (ProblemList problemList : problemLists) {
            Problem problem = problemList.getProblem();

            Problem problemCopy = Problem.builder()
                    .type(problem.getType())
                    .title(problem.getTitle())
                    .path(problem.getPath())
                    .text(problem.getText())
                    .answer(problem.getAnswer())
                    .point(problem.getPoint())
                    .build();

            problems.add(problemCopy);
            problemNumList.add(problemList.getProblemNum());
        }
        problemRepository.saveAll(problems);

        // 3. 문제 항목 만들기
        // 문제 항목 복사 리스트
        List<Item> itemCopyList = new ArrayList<>();

        // 항목이 있는 문제 번호 관리용 PQ
        PriorityQueue<Long> itemPq = new PriorityQueue<>();

        for(int i = 0; i < problemLists.size(); i++) {
            List<Item> itemList = itemRepository.findAllByProblemId(problemLists.get(i).getId());

            if(!itemList.isEmpty()) {
                for (Item item : itemList) {
                    Item itemCopy = Item.builder()
                            .problem(problems.get(i))
                            .no(item.getNo())
                            .content(item.getContent())
                            .isImage(item.getIsImage())
                            .build();

                    itemCopyList.add(itemCopy);
                }
                itemPq.add(itemList.get(0).getProblem().getId());
            }
        }

        itemRepository.saveAll(itemCopyList);

        // 4. 문제 목록 만들기
        // 문제 목록 복사 리스트
        List<ProblemList> problemListsCopy = new ArrayList();

        for (int i = 0; i < problems.size(); i++) {
            Problem problem = problems.get(i);

            ProblemList problemListCopy = ProblemList.builder()
                    .problem(problem)
                    .workbook(workbookCopy)
                    .problemNum(problemNumList.get(i))
                    .build();

            problemListsCopy.add(problemListCopy);
        }

        problemListRepository.saveAll(problemListsCopy);

        WorkbookInfoDto workbookInfoDto = WorkbookInfoDto.builder()
                .workbookId(workbookCopy.getId())
                .title(workbookCopy.getTitle())
                .workbookImgPath(workbookCopy.getWorkbookImg().getPath())
                .description(workbookCopy.getDescription())
                .volume(workbookCopy.getVolume())
                .isPublic(workbookCopy.getIsPublic())
                .build();

        List<ProblemAllInfoDto> problemList = new ArrayList<>();

        int size = itemCopyList.size();
        int j = 0;
        List<ItemDto> itemDtoList = new ArrayList<>();

        for(int i = 0; i < problemListsCopy.size(); i++) {
            ProblemList problemListToDto = problemListsCopy.get(i);
            Problem problemToDto = problems.get(i);

            if (size != 0 && itemCopyList.get(j).getProblem().getId() == problemToDto.getId()) {

                while (j < size && problemToDto.getId() == itemCopyList.get(j).getProblem().getId()) {
                    Item tempItem = itemCopyList.get(j);

                    ItemDto itemDto = ItemDto.builder()
                            .itemId(tempItem.getId())
                            .no(tempItem.getNo())
                            .content(tempItem.getContent())
                            .isImage(tempItem.getIsImage())
                            .build();
                    itemDtoList.add(itemDto);

                    j++;
                }
            }
            ProblemAllInfoDto problemAllInfoDto = ProblemAllInfoDto.builder()
                    .problemId(problemToDto.getId())
                    .problemNum(problemListToDto.getProblemNum())
                    .type(problemToDto.getType())
                    .title(problemToDto.getTitle())
                    .path(problemToDto.getPath())
                    .answer(problemToDto.getAnswer())
                    .point(problemToDto.getPoint())
                    .itemList(itemDtoList.size() == 0 ? null : itemDtoList)
                    .build();

            problemList.add(problemAllInfoDto);
        }

        WorkbookCopyDto workbookCopyDto = WorkbookCopyDto.builder()
                .workbookInfoDto(workbookInfoDto)
                .problemList(problemList)
                .build();

        return responseUtil.successResponse(workbookCopyDto, ForestStatus.WORKBOOK_SUCCESS_COPY);
    }

    @Override
    public ResponseSuccessDto<?> createWorkbook(Long userId, WorkbookTitleDto workbookTitleDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        WorkbookImg workbookImg = workbookImgRepository.findById(Long.valueOf(1))
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_IMG_NOT_FOUND));

        Workbook workbook = Workbook.builder()
                .workbookImg(workbookImg)
                .creator(user)
                .title(workbookTitleDto.getTitle())
                .build();

        workbookRepository.save(workbook);

        WorkbookInfoDto workbookInfoDto = WorkbookInfoDto.builder()
                .workbookId(workbook.getId())
                .title(workbook.getTitle())
                .workbookImgPath(workbookImg.getPath())
                .description(workbook.getDescription())
                .isPublic(workbook.getIsPublic())
                .volume(workbook.getVolume())
                .build();

        return responseUtil.successResponse(workbookInfoDto, ForestStatus.WORKBOOK_SUCCESS_CREATE);
    }

    public TeacherWorkbookPageDto workbooksToDto(Page<Workbook> workbooks) {
        Page<TeacherWorkbookDto> workbookList = workbooks.map(w -> TeacherWorkbookDto.builder()
                .workbookId(w.getId())
                .title(w.getTitle())
                .workbookImgPath(w.getWorkbookImg().getPath())
                .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarked(w.getId(), true))
                .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScraped(w.getId(), true))
                .build());
        TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
        return  teacherWorkbookPageDtoList;
    }
}
