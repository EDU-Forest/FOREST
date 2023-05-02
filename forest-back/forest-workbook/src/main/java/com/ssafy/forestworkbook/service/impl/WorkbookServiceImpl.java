package com.ssafy.forestworkbook.service.impl;

import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.*;
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
import java.time.LocalTime;
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
    private final StudyRepository studyRepository;
    private final ResponseUtil responseUtil;

    @Override
    public ResponseSuccessDto<Page<TeacherWorkbookDto>> getTeacherWorkbookList(Long userId, String search, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        // 좋아하는 문제집
        if(Objects.equals(search, "like")) {
            Page<UserWorkbook> userWorkbooks = userWorkbookRepository.findAllByUserAndIsBookmarkedIsTrueAndWorkbookIsPublicIsTrue(user, pageable);
            Page<TeacherWorkbookDto> workbookList = userWorkbooks.map(w -> TeacherWorkbookDto.builder()
                    .workbookId(w.getWorkbook().getId())
                    .title(w.getWorkbook().getTitle())
                    .workbookImgPath(w.getWorkbook().getWorkbookImg().getPath())
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(w.getWorkbook().getId()))
                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(w.getWorkbook().getId()))
                    .build());
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
        }

        // 사용한 문제집
        else if(search.equals("use")) {
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorIdAndIsExecuted(userId, true, pageable);
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = workbooksToDto(workbooks);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
        }

        // 내가 만든 문제집
        else if(search.equals("own")) {
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorId(userId, pageable);
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = workbooksToDto(workbooks);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
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

        // 공개되지 않았으면서 내가 만든 문제집이 아닌 경우 -> 스크랩 불가능 -> 사본 생성 불가능
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
                    .isBookmarked(false)
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
                .bookmarkCount(0)
                .scrapCount(0)
                .build();

        List<ProblemAllInfoDto> problemList = new ArrayList<>();

        int size = itemCopyList.size();
        int j = 0;
        List<ItemResDto> itemResList = new ArrayList<>();

        for(int i = 0; i < problemListsCopy.size(); i++) {
            ProblemList problemListToDto = problemListsCopy.get(i);
            Problem problemToDto = problems.get(i);

            if (size != 0 && itemCopyList.get(j).getProblem().getId() == problemToDto.getId()) {

                while (j < size && problemToDto.getId() == itemCopyList.get(j).getProblem().getId()) {
                    Item tempItem = itemCopyList.get(j);

                    ItemResDto itemRes = ItemResDto.builder()
                            .itemId(tempItem.getId())
                            .no(tempItem.getNo())
                            .content(tempItem.getContent())
                            .isImage(tempItem.getIsImage())
                            .build();
                    itemResList.add(itemRes);

                    j++;
                }
            }
            ProblemAllInfoDto problemAllInfoDto = ProblemAllInfoDto.builder()
                    .problemId(problemToDto.getId())
                    .problemNum(problemListToDto.getProblemNum())
                    .type(problemToDto.getType())
                    .title(problemToDto.getTitle())
                    .problemImgPath(problemToDto.getPath())
                    .answer(problemToDto.getAnswer())
                    .text(problemToDto.getText())
                    .textIsEmpty((problemToDto.getText().equals("") || problemToDto.getText() == null) ? true : false)
                    .point(problemToDto.getPoint())
                    .itemList(itemResList.isEmpty() ? null : itemResList)
                    .build();

            problemList.add(problemAllInfoDto);
        }

        WorkbookToDto workbookToDto = WorkbookToDto.builder()
                .workbookInfoDto(workbookInfoDto)
                .problemList(problemList)
                .build();

        return responseUtil.successResponse(workbookToDto, ForestStatus.WORKBOOK_SUCCESS_COPY);
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
                .bookmarkCount(0)
                .scrapCount(0)
                .build();

        return responseUtil.successResponse(workbookInfoDto, ForestStatus.WORKBOOK_SUCCESS_CREATE);
    }

    @Override
    public ResponseSuccessDto<?> getWorkbookAllInfo(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId).orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        List<ProblemList> problemLists = problemListRepository.findAllByWorkbookId(workbookId);
        List<ProblemAllInfoDto> problemAllInfoDtoList = new ArrayList<>();

        // 공개되지 않았으면서 내가 만든 문제집이 아닌 경우 -> 조회 불가능
        if (workbook.getCreator().getId() != userId && workbook.getIsPublic() == false)
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_LIST);

        for (ProblemList problemList : problemLists) {
            Problem problem = problemRepository.findById(problemList.getProblem().getId())
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEM));

            List<Item> itemList = itemRepository.findAllByProblemId(problem.getId());
            List<ItemResDto> itemResList = new ArrayList<>();

            for (Item item : itemList) {
                ItemResDto itemRes = ItemResDto.builder()
                        .itemId(item.getId())
                        .no(item.getNo())
                        .content(item.getContent())
                        .isImage(item.getIsImage())
                        .build();
                itemResList.add(itemRes);
            }

            ProblemAllInfoDto problemAllInfoDto = ProblemAllInfoDto.builder()
                    .problemId(problem.getId())
                    .problemNum(problemList.getProblemNum())
                    .type(problem.getType())
                    .title(problem.getTitle())
                    .problemImgPath(problem.getPath())
                    .text(problem.getText())
                    .textIsEmpty((problem.getText() == null || problem.getText().equals("")) ? true : false)
                    .answer(problem.getAnswer())
                    .point(problem.getPoint())
                    .itemList(itemResList.isEmpty() ? null : itemResList)
                    .build();

            problemAllInfoDtoList.add(problemAllInfoDto);
        }

        WorkbookInfoDto workbookInfoDto = WorkbookInfoDto.builder()
                .workbookId(workbook.getId())
                .title(workbook.getTitle())
                .workbookImgPath(workbook.getWorkbookImg().getPath())
                .description(workbook.getDescription())
                .volume(workbook.getVolume())
                .isPublic(workbook.getIsPublic())
                .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(workbook.getId()))
                .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(workbook.getId()))
                .build();

        WorkbookToDto workbookToDto = WorkbookToDto.builder()
                .workbookInfoDto(workbookInfoDto)
                .problemList(problemAllInfoDtoList)
                .build();


        return responseUtil.successResponse(workbookToDto, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
    }

    @Override
    public ResponseSuccessDto<?> updateWorkbook(Long userId, WorkbookUpdateInfoDto workbookUpdateInfoDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookUpdateInfoDto.getWorkbookInfo().getWorkbookId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        WorkbookImg workbookImg = workbookImgRepository.findById(workbookUpdateInfoDto.getWorkbookInfo().getWorkbookImgId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_IMG_NOT_FOUND));
        log.info("{}", userId);

        if(userId != workbook.getCreator().getId()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_UPADATE);
        }

        WorkbookDetailDto workbookDetailDto = workbookUpdateInfoDto.getWorkbookInfo();
        List<ProblemOrderDto> problemOrderDtoList = workbookUpdateInfoDto.getProblemList();

        workbook.updateWorkbook(workbookDetailDto.getTitle(), workbookImg, workbookDetailDto.getDescription());

        if(!problemOrderDtoList.isEmpty()) {
            for(ProblemOrderDto problemOrderDto : problemOrderDtoList) {
                ProblemList problemList = problemListRepository.findByProblemId(problemOrderDto.getProblemId())
                        .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEMLIST));
                problemList.updateProblemNum(problemOrderDto.getProblemNum());
            }
        }

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_UPDATE);
    }

    @Override
    public ResponseSuccessDto<?> updateProblem(Long userId, ProblemUpdateInfoDto problemUpdateInfoDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(problemUpdateInfoDto.getWorkbookInfo().getWorkbookId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        if(userId != workbook.getCreator().getId()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_UPADATE);
        }

        List<ProblemDto> problemDtoList = problemUpdateInfoDto.getProblemList();

        for (ProblemDto problemDto : problemDtoList) {
            log.info("{}", problemDto.getProblemId());
            List<Item> itemList = itemRepository.findAllByProblemId(problemDto.getProblemId());

            // request ItemList size
            int size = (problemDto.getItemList() == null) ? 0 : problemDto.getItemList().size();
            // entity ItemList size
            int maxSize = itemList.size();

            log.info("size : {}, maxSize : {}", size, maxSize);

            updateItemList((size > maxSize ? maxSize : size), itemList, problemDto.getItemList());

            // update > maxSize > insert > size
            if (size > maxSize) {
                insertItemList(maxSize, size, problemDto.getItemList());
            }

            // update > maxSize
//            else if (size == maxSize) {
//                updateItemList(maxSize, itemList, problemDto.getItemList());
//            }

            // update > size > delete > maxSize
            else {
                deleteItemList(size, maxSize, itemList);
            }
        }
        return null;
    }

    @Override
    public ResponseSuccessDto<?> checkExportRange(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        boolean isOriginal = true;

        if (workbook.getCreator().getId() != userId) {
            isOriginal = false;
        }

        IsOriginalDto isOriginalDto = IsOriginalDto.builder().isOriginal(isOriginal).build();

        return responseUtil.successResponse(isOriginalDto, ForestStatus.WORKBOOK_SUCCESS_GET_EXPORT_INFO);
    }

    @Override
    public ResponseSuccessDto<?> changeWorkbookIsPublic(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        // 내가 만든 문제집만 공개 여부 설정 가능
        if (workbook.getCreator().getId() != userId) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_NOT_OWN);
        }

        // 배포 전에는 공개 여부 설정 불가
        if (!workbook.getIsExecuted()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_CHANGE_ISPUBLIC);
        }

        workbook.changeIsPublid(!workbook.getIsPublic());

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_CHANGE_ISPUBLIC);
    }

    @Override
    public ResponseSuccessDto<?> delpoyWorkbook(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        // 내가 만든 문제집만 배포 가능
        if (workbook.getCreator().getId() != userId) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_NOT_OWN);
        }

        // 배포 했는데 비공개인 경우 공개 여부 변경
        if (workbook.getIsExecuted() && workbook.getIsPublic()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_DEPLOY);
        }

        workbook.changeIsPublid(true);
        workbook.changeIsExcuted(true);

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_DEPLOY);
    }

    @Override
    public ResponseSuccessDto<?> createBookmark(Long userId, Long workbookId, boolean isNew) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        if(!workbook.getIsPublic() || !workbook.getIsExecuted()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_ADD_BOOKMARK);
        }

        // insert
        if (isNew) {
            UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_USERWORKBOOK));

            if (userWorkbook != null) {
                userWorkbook.updateIsBookmarked(true);
                return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_ADD_BOOKMARK);
            }

            UserWorkbook createUserWorkbook = UserWorkbook.builder()
                    .user(user)
                    .workbook(workbook)
                    .isBookmarked(true)
                    .build();

            userWorkbookRepository.save(createUserWorkbook);
        }

        // update
        else {
            UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_USERWORKBOOK));

            userWorkbook.updateIsBookmarked(true);
        }
        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_ADD_BOOKMARK);
    }

    @Override
    public ResponseSuccessDto<?> deleteBookmark(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbook.getId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_USERWORKBOOK));

        userWorkbook.updateIsBookmarked(false);
        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_DELETE_BOOKMARK);
    }

    @Override
    public ResponseSuccessDto<?> getBestWorkbook(Long userId, String search) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        List<ExploreWorkbookDto> exploreWorkbookDtoList;

        // 좋아요순
        if (search.equals("bookmark")) {
            List<BestWorkbookDto> bestWorkbookList = workbookRepository.findTop20ByIsBookmarkedBestWorkbook();
            exploreWorkbookDtoList = userWorkbookToDto(userId, bestWorkbookList);
        }

        // 사용순
        else if (search.equals("scrap")) {
            List<BestWorkbookDto> bestWorkbookList = workbookRepository.findTop20ByIsScrapedBestWorkbook();
            exploreWorkbookDtoList = userWorkbookToDto(userId, bestWorkbookList);
        }

        // 파라미터 오류
        else {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_PARAM_NO_VAILD);
        }

        ExploreWorkbookListkDto exploreWorkbookListkDto = new ExploreWorkbookListkDto(exploreWorkbookDtoList);
        return responseUtil.successResponse(exploreWorkbookListkDto, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
    }

    @Override
    public ResponseSuccessDto<?> getRecentWorkbook(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        List<ExploreWorkbookDto> exploreWorkbookDtoList = new ArrayList<>();

        List<Workbook> workbookList = workbookRepository.findTop20ByIsPublicIsTrueOrderByCreatedDateDesc();

        for (Workbook workbook : workbookList) {
            UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbook.getId())
                    .orElse(null);

            ExploreWorkbookDto exploreWorkbookDto = ExploreWorkbookDto.builder()
                    .workbookId(workbook.getId())
                    .title(workbook.getTitle())
                    .workbookImgPath(workbook.getWorkbookImg().getPath())
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(workbook.getId()))
                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(workbook.getId()))
                    .methodType((userWorkbook == null) ? "POST" : "FATCH")
                    .isScraped((userWorkbook == null) ? false : userWorkbook.getIsScraped())
                    .isBookmarked((userWorkbook == null) ? false : userWorkbook.getIsBookmarked())
                    .build();
            exploreWorkbookDtoList.add(exploreWorkbookDto);
        }
        ExploreWorkbookListkDto exploreWorkbookListkDto = new ExploreWorkbookListkDto(exploreWorkbookDtoList);
        return responseUtil.successResponse(exploreWorkbookListkDto, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
    }

    @Override
    public ResponseSuccessDto<?> getClassWorkbook(Long userId, Long classId, String search) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        LocalTime now = LocalTime.now();

        // EXAM
        if (search.equals("exam")) {
            List<Study> studyList = studyRepository.findAllByClassesId(classId);

//            for (Study study : studyList) {
//                ClassWorkbookDto classWorkbookDto = ClassWorkbookDto.builder()
//                        .
//                        .build();
//            }


        }

        // HOMEWORK
        else if (search.equals("homework")) {

        }

        // SELF
        else if (search.equals("self")) {

        }

        // 파라미터 입력 오류
        else {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_PARAM_NO_VAILD);
        }


        return null;
    }

    public TeacherWorkbookPageDto workbooksToDto(Page<Workbook> workbooks) {
        Page<TeacherWorkbookDto> workbookList = workbooks.map(w -> TeacherWorkbookDto.builder()
                .workbookId(w.getId())
                .title(w.getTitle())
                .workbookImgPath(w.getWorkbookImg().getPath())
                .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(w.getId()))
                .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(w.getId()))
                .build());
        TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
        return  teacherWorkbookPageDtoList;
    }

    public List<ExploreWorkbookDto> userWorkbookToDto(Long userId, List<BestWorkbookDto> bestWorkbookList) {
        List<ExploreWorkbookDto> workbookList = new ArrayList<>();

        for(BestWorkbookDto workbookDto : bestWorkbookList) {

            UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookDto.getWorkbookId())
                    .orElse(null);

            ExploreWorkbookDto exploreWorkbookDto = ExploreWorkbookDto.builder()
                    .workbookId(workbookDto.getWorkbookId())
                    .title(workbookDto.getTitle())
                    .workbookImgPath(workbookDto.getWorkbookImgPath())
                    .bookmarkCount(workbookDto.getCount())
                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(workbookDto.getWorkbookId()))
                    .methodType((userWorkbook == null) ? "POST" : "FATCH")
                    .isScraped((userWorkbook == null) ? false : userWorkbook.getIsScraped())
                    .isBookmarked((userWorkbook == null) ? false : userWorkbook.getIsBookmarked())
                    .build();

            workbookList.add(exploreWorkbookDto);
        }
        return workbookList;
    }

    public void updateItemList(int size, List<Item> itemList, List<ItemReqDto> itemReqList) {
        for(int i = 0; i < size; i++) {
            Item item = itemList.get(i);
            ItemReqDto itemReqDto = itemReqList.get(i);

            item.updateItem(itemReqDto.getNo(), itemReqDto.getContent(), itemReqDto.getIsImage());
        }
    }

    public void insertItemList(int start, int size, List<ItemReqDto> itemReqList) {
        List<Item> itemList = new ArrayList<>();

        for(int i = start; i < size; i++) {
            ItemReqDto itemReqDto = itemReqList.get(i);
            Problem problem = problemRepository.findById(itemReqDto.getProblemId())
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEM));
            Item item = Item.builder()
                    .problem(problem)
                    .no(itemReqDto.getNo())
                    .content(itemReqDto.getContent())
                    .isImage(itemReqDto.getIsImage())
                    .build();

            itemList.add(item);
            log.info(item.toString());
        }
        itemRepository.saveAll(itemList);
    }

    public void deleteItemList(int start, int size, List<Item> itemList) {
        for(int i = start; i < size; i++) {
            Item item = itemList.get(i);
            log.info("{}", item.getId());
            itemRepository.deleteById(item.getId());
        }
    }
}
