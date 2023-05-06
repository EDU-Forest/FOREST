package com.ssafy.forestworkbook.service.impl;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.ssafy.forest.exception.CustomException;
import com.ssafy.forestworkbook.dto.common.response.ResponseSuccessDto;
import com.ssafy.forestworkbook.dto.workbook.request.*;
import com.ssafy.forestworkbook.dto.workbook.response.*;
import com.ssafy.forestworkbook.entity.*;
import com.ssafy.forestworkbook.enumeration.EnumProblemTypeStatus;
import com.ssafy.forestworkbook.enumeration.EnumStudyTypeStatus;
import com.ssafy.forestworkbook.enumeration.response.ForestStatus;
import com.ssafy.forestworkbook.errorhandling.exception.WorkbookErrorCode;
import com.ssafy.forestworkbook.repository.*;
import com.ssafy.forestworkbook.service.WorkbookService;
import com.ssafy.forestworkbook.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

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
    private final ClassRepository classRepository;
    private final ClassStudyResultRepository classStudyResultRepository;
    private final ResponseUtil responseUtil;

//    @Value("${spring.cloud.gcp.storage.bucket}") // application.yml에 써둔 bucket 이름
//    private String bucketName;
//    private final Storage storage;

    @Override
    public ResponseSuccessDto<Page<TeacherWorkbookDto>> getTeacherWorkbookList(Long userId, String search, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        // 좋아하는 문제집
        // 스크랩 한 것도 좋아하는 문제집에
        if (Objects.equals(search, "like")) {
            Page<UserWorkbook> userWorkbooks =
                    userWorkbookRepository.findAllByUserAndWorkbookIsPublicIsTrueAndWorkbookIsDeployIsTrueAndIsBookmarkedIsTrueOrIsScrapedIsTrue(user, pageable);
            Page<TeacherWorkbookDto> workbookList = userWorkbooks.map(w -> TeacherWorkbookDto.builder()
                    .workbookId(w.getWorkbook().getId())
                    .isOriginal(w.getWorkbook().getCreator().getId() == userId)
                    .isBookmarked(w.getIsBookmarked())
                    .title(w.getWorkbook().getTitle())
                    .workbookImgPath(w.getWorkbook().getWorkbookImg().getPath())
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(w.getWorkbook().getId()))
                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(w.getWorkbook().getId()))
                    .build());
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
        }

        // 사용한 문제집
        else if (search.equals("use")) {
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorIdAndIsExecuted(userId, true, pageable);
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = workbooksToDto(workbooks, userId);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
        }

        // 내가 만든 문제집
        else if (search.equals("own")) {
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorId(userId, pageable);
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = workbooksToDto(workbooks, userId);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
        }

        // 파라미터 입력 오류
        else {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_PARAM_NO_VAILD);
        }
    }

    @Override
    public ResponseSuccessDto<?> getClassWorkbook(Long userId, Long classId, String search) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        List<ClassWorkbookDto> classWorkbookDtoList = new ArrayList<>();

        // EXAM
        if (search.equals("exam")) {
            List<Study> studyList = studyRepository.findAllByClassesIdAndType(classId, EnumStudyTypeStatus.EXAM);
            studyToDto(studyList, classWorkbookDtoList);
        }

        // HOMEWORK
        else if (search.equals("homework")) {
            List<Study> studyList = studyRepository.findAllByClassesIdAndType(classId, EnumStudyTypeStatus.HOMEWORK);
            studyToDto(studyList, classWorkbookDtoList);
        }

        // SELF
        else if (search.equals("self")) {
            List<Study> studyList = studyRepository.findAllByClassesIdAndType(classId, EnumStudyTypeStatus.SELF);
            studyToDto(studyList, classWorkbookDtoList);
        }

        // 파라미터 입력 오류
        else {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_PARAM_NO_VAILD);
        }

        ClassWorkbookListDto classWorkbookListDto = new ClassWorkbookListDto(classWorkbookDtoList);
        return responseUtil.successResponse(classWorkbookListDto, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
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
                    .imgIsEmpty(problem.getPath() == null || problem.getPath().equals(""))
                    .text(problem.getText())
                    .textIsEmpty((problem.getText() == null || problem.getText().equals("")))
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
                .isOriginal(workbook.getCreator().getId() == userId)
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
                .isOriginal(workbook.getCreator().getId() == userId)
                .volume(workbook.getVolume())
                .bookmarkCount(0)
                .scrapCount(0)
                .build();

        return responseUtil.successResponse(workbookInfoDto, ForestStatus.WORKBOOK_SUCCESS_CREATE);
    }

    @Override
    public ResponseSuccessDto<?> updateWorkbook(Long userId, WorkbookUpdateInfoDto workbookUpdateInfoDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookUpdateInfoDto.getWorkbookInfo().getWorkbookId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        WorkbookImg workbookImg = workbookImgRepository.findById(workbookUpdateInfoDto.getWorkbookInfo().getWorkbookImgId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_IMG_NOT_FOUND));

        if (userId != workbook.getCreator().getId()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_UPADATE);
        }

        WorkbookDetailDto workbookDetailDto = workbookUpdateInfoDto.getWorkbookInfo();
        List<ProblemOrderDto> problemOrderDtoList = workbookUpdateInfoDto.getProblemList();

        workbook.updateWorkbook(workbookDetailDto.getTitle(), workbookImg, workbookDetailDto.getDescription());

        if (!problemOrderDtoList.isEmpty()) {
            for (ProblemOrderDto problemOrderDto : problemOrderDtoList) {
                ProblemList problemList = problemListRepository.findByProblemIdAndWorkbookId(problemOrderDto.getProblemId(), workbookUpdateInfoDto.getWorkbookInfo().getWorkbookId())
                        .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEMLIST));
                problemList.updateProblemNum(problemOrderDto.getProblemNum());
            }
        }

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_UPDATE);
    }

    @Override
    public ResponseSuccessDto<?> deleteWorkbook(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        // 내 문제집이 아닌 경우 - 북마크 삭제
        if (user.getId() != workbook.getCreator().getId()) {
            UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_USERWORKBOOK));
            userWorkbook.updateIsBookmarked(false);
            userWorkbook.updateIsScraped(false);
        }

        // 내 문제집인 경우 - 삭제, 유저 북마크 전체 삭제
        else {
            workbookRepository.deleteById(workbookId);
            List<UserWorkbook> userWorkbookList = userWorkbookRepository.findAllByWorkbookId(workbookId);
            for (UserWorkbook userWorkbook : userWorkbookList) {
                userWorkbook.updateIsScraped(false);
                userWorkbook.updateIsBookmarked(false);
            }
        }

        // TODO 만약 출제한 문제집이면...?

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_DELETE_WORKBOOK);
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

        workbook.changeIsPublic(!workbook.getIsPublic());

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_CHANGE_ISPUBLIC);
    }

    @Override
    public ResponseSuccessDto<?> executeWorkbook(Long userId, ExcuteDto excuteDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(excuteDto.getWorkbookId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        ClassEntity classEntity = classRepository.findById(excuteDto.getClassId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.CLASS_NOT_FOUND));

        EnumStudyTypeStatus enumStudyTypeStatus;
        if (excuteDto.getType().equals("exam")) {
            enumStudyTypeStatus = EnumStudyTypeStatus.EXAM;
        } else if (excuteDto.getType().equals("homework")) {
            enumStudyTypeStatus = EnumStudyTypeStatus.HOMEWORK;
        } else if (excuteDto.getType().equals("self")) {
            enumStudyTypeStatus = EnumStudyTypeStatus.SELF;
        } else {
            throw new CustomException(WorkbookErrorCode.STUDY_TYPE_NO_VAILD);
        }

        workbook.changeIsExcuted(true);

        Study study = Study.builder()
                .classes(classEntity)
                .workbook(workbook)
                .user(user)
                .name(excuteDto.getName())
                .type(enumStudyTypeStatus)
                .startTime(excuteDto.getStartTime())
                .endTime(excuteDto.getEndTime())
                .build();

        studyRepository.save(study);

        ClassStudyResult classStudyResult = ClassStudyResult.builder()
                .study(study).build();

        classStudyResultRepository.save(classStudyResult);

        StudyIdDto studyIdDto = StudyIdDto.builder().studyId(study.getId()).build();

        return responseUtil.successResponse(studyIdDto, ForestStatus.WORKBOOK_SUCCESS_EXECUTE);
    }

    @Override
    public ResponseSuccessDto<?> checkExportRange(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));


        boolean isOriginal = checkIsOriginal(workbook.getCreator().getId(), userId);

        IsOriginalDto isOriginalDto = IsOriginalDto.builder().isOriginal(isOriginal).build();

        return responseUtil.successResponse(isOriginalDto, ForestStatus.WORKBOOK_SUCCESS_GET_EXPORT_INFO);
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

        // 배포 했는 경우
        if (workbook.getIsExecuted() && workbook.getIsPublic()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_ALREADY_DEPLOY);
        }

        workbook.changeIsPublic(true);
        workbook.changeIsDeploy(true);

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_DEPLOY);
    }

    @Override
    public ResponseSuccessDto<?> copyWorkbook(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        // 1. 문제집 만들기
        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        // 공개되지 않았으면서 내가 만든 문제집이 아닌 경우 -> 스크랩 불가능 -> 사본 생성 불가능
        if (workbook.getCreator().getId() != userId && !workbook.getIsPublic())
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

        // 문제 항목 복사 필요 여부
        int[] itemIsMultiple = new int[problemLists.size()];
        log.info("{}", problemLists.size());
        int check = 0;

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

            if (problemCopy.getType().equals(EnumProblemTypeStatus.MULTIPLE)) {
                itemIsMultiple[check] = check;
            } else {
                itemIsMultiple[check] = -1;
            }
            check++;

        }
        problemRepository.saveAll(problems);

        // 3. 문제 항목 만들기
        // 문제 항목 복사 리스트
        List<Item> itemCopyList = new ArrayList<>();
        int[] itemCount = new int[itemIsMultiple.length];
        int count = -1;

        for (int checked : itemIsMultiple) {
            count++;
            int itemListSize = 0;
            if (checked == -1) continue;
            else {

                List<Item> itemList = itemRepository.findAllByProblemId(problemLists.get(checked).getId());
                itemListSize = itemList.size();

                for (Item item : itemList) {
                    Item itemCopy = Item.builder()
                            .problem(problems.get(checked))
                            .no(item.getNo())
                            .content(item.getContent())
                            .isImage(item.getIsImage())
                            .build();

                    itemCopyList.add(itemCopy);
                }
                itemCount[count] = itemListSize;
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
                .isOriginal(false)
                .bookmarkCount(0)
                .scrapCount(0)
                .build();

        List<ProblemAllInfoDto> problemList = new ArrayList<>();

        int size = itemCopyList.size();
        int j = 0;

        for (int i = 0; i < problemListsCopy.size(); i++) {
            ProblemList problemListToDto = problemListsCopy.get(i);
            Problem problemToDto = problems.get(i);

            List<ItemResDto> itemResList = new ArrayList<>();

            if (itemIsMultiple[i] != -1) {
                for (int k = 0; k < itemCount[i]; k++) {
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
                    .imgIsEmpty(problemToDto.getPath() == null || problemToDto.getPath().equals(""))
                    .answer(problemToDto.getAnswer())
                    .text(problemToDto.getText())
                    .textIsEmpty((problemToDto.getText() == null || problemToDto.getText().equals("")))
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
    public ResponseSuccessDto<?> updateProblem(Long userId, ProblemUpdateInfoDto problemUpdateInfoDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(problemUpdateInfoDto.getWorkbookId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        if (userId != workbook.getCreator().getId()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_NOT_OWN);
        }

        // 기존 문제 보기 삭제
        for (ItemIdDto itemId : problemUpdateInfoDto.getDeleteItemList()) {
            Item item = itemRepository.findById(itemId.getItemId())
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_ITEM_NOT_FOUND));
            item.deleteById(true);
        }

        // 문제 만들기
        for (ProblemDto problemDto : problemUpdateInfoDto.getProblemList()) {
            EnumProblemTypeStatus enumProblemTypeStatus;
            String problemType = problemDto.getType();

            if (problemType.equals("MULTIPLE")) {
                enumProblemTypeStatus = EnumProblemTypeStatus.MULTIPLE;
            } else if (problemType.equals("SUBJECTIVE")) {
                enumProblemTypeStatus = EnumProblemTypeStatus.SUBJECTIVE;
            } else if (problemType.equals("DESCRIPT")) {
                enumProblemTypeStatus = EnumProblemTypeStatus.DESCRIPT;
            } else if (problemType.equals("OX")) {
                enumProblemTypeStatus = EnumProblemTypeStatus.OX;
            } else {
                throw new CustomException(WorkbookErrorCode.PROBLEM_TYPE_NO_VAILD);
            }

            Problem problem = Problem.builder()
                    .type(enumProblemTypeStatus)
                    .title(problemDto.getTitle())
                    .path(problemDto.getPath())
                    .text(problemDto.getText())
                    .answer(problemDto.getAnswer())
                    .point(problemDto.getPoint())
                    .build();

            problemRepository.save(problem);

            // 항목 만들기
            if (enumProblemTypeStatus.equals(EnumProblemTypeStatus.MULTIPLE)
                    && problemDto.getItemList() !=
                    null && !problemDto.getItemList().isEmpty()) {

                List<Item> itemList = new ArrayList<>();
                for (ItemContentDto itemContent : problemDto.getItemList()) {
                    Item item = Item.builder()
                            .problem(problem)
                            .no(itemContent.getItemNo())
                            .content(itemContent.getContent())
                            .isImage(itemContent.getIsImage())
                            .build();

                    itemList.add(item);
                }
                itemRepository.saveAll(itemList);
            }

            // 문제 리스트 만들기
            ProblemList problemList = ProblemList.builder()
                    .workbook(workbook)
                    .problem(problem)
                    .problemNum(problemDto.getProblemNo())
                    .build();

            problemListRepository.save(problemList);
        }

        workbook.updateVolume(problemUpdateInfoDto.getProblemList().size());

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_CREATE);
    }

    @Override
    public ResponseSuccessDto<?> createProblemImg(Long userId, MultipartFile file) throws IOException {
//        String uuid = UUID.randomUUID().toString(); // Google Cloud Storage에 저장될 파일 이름
//        String ext = file.getContentType(); // 파일의 형식 ex) JPG
//
//        // Cloud에 이미지 업로드
//        BlobInfo blobInfo = storage.create(
//                BlobInfo.newBuilder(bucketName, uuid)
//                        .setContentType(ext)
//                        .build(),
//                file.getInputStream()
//        );
//
//        ImagePathDto imagePathDto = ImagePathDto.builder()
//                .path("https://storage.cloud.google.com/" + bucketName + "/" + uuid)
//                .build();

//        return responseUtil.successResponse(imagePathDto, ForestStatus.WORKBOOK_SUCCESS_UPLOAD_IMG);
        return responseUtil.successResponse( ForestStatus.WORKBOOK_SUCCESS_UPLOAD_IMG);
    }

    @Override
    public ResponseSuccessDto<?> deleteProblem(Long userId, Long problemId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEM));

        ProblemList problemList = problemListRepository.findTop1ByProblemId(problemId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEMLIST));

        Workbook workbook = workbookRepository.findById(problemList.getWorkbook().getId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        if (workbook.getIsExecuted() || workbook.getIsDeploy() || workbook.getIsDeleted()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_DELETE_PROBLEM);
        }

        if (workbook.getCreator().getId() != userId) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_NOT_OWN);
        }

        List<Item> itemList = itemRepository.findAllByProblemId(problemId);

        if (!itemList.isEmpty()) {
            for (Item item : itemList) {
                item.deleteById(true);
            }
        }

        problem.deleteById(true);
        problemList.deleteById(true);

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_DELETE_PROBLEM);
    }


    @Override
    public ResponseSuccessDto<?> createBookmark(Long userId, Long workbookId, boolean isNew) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        if (!workbook.getIsPublic() || !workbook.getIsDeploy()) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_ADD_BOOKMARK);
        }

        // insert
        if (isNew) {
            UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                    .orElse(null);

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
    public ResponseSuccessDto<?> scrapWorkbook(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbook.getId())
                .orElse(null);

        if (userWorkbook == null) {
            UserWorkbook userWorkbookSave = UserWorkbook.builder()
                    .user(user)
                    .workbook(workbook)
                    .isBookmarked(false)
                    .build();

            userWorkbookSave.updateIsScraped(true);
            userWorkbookRepository.save(userWorkbookSave);
        } else {
            userWorkbook.updateIsScraped(true);
        }

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_ADD_SCRAP);
    }

    @Override
    public ResponseSuccessDto<?> getBestWorkbook(Long userId, String search) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        List<ExploreWorkbookDto> exploreWorkbookDtoList = new ArrayList<>();

        // 좋아요순
        if (search.equals("bookmark")) {
            List<BestWorkbookDto> bestWorkbookList = workbookRepository.findTop20ByIsBookmarkedBestWorkbook();
            userWorkbookToDto(userId, bestWorkbookList, exploreWorkbookDtoList);
        }

        // 사용순
        else if (search.equals("scrap")) {
            List<BestWorkbookDto> bestWorkbookList = workbookRepository.findTop20ByIsScrapedBestWorkbook();
            userWorkbookToDto(userId, bestWorkbookList, exploreWorkbookDtoList);
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
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(workbook.getId()))
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
    public ResponseSuccessDto<?> getEditorWorkbook(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        List<Workbook> workbookTitleList = workbookRepository.findAllByCreatorId(userId);
        List<WorkbookEditorDto> workbookList = workbookTitleList.stream()
                .map(w -> WorkbookEditorDto.builder()
                        .workbookId(w.getId())
                        .title(w.getTitle())
                        .build())
                .collect(Collectors.toList());

        return responseUtil.successResponse(new WorkbookEditorListDto(workbookList), ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
    }

    @Override
    public ResponseSuccessDto<?> searchEditorWorkbook(Long userId, String search) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        List<Workbook> workbookList = workbookRepository.findAllByIsPublicIsTrueAndTitleContainingOrderByCreatedDateDesc(search);

        List<ExploreWorkbookDto> exploreWorkbookDtoList = workbookList.stream()
                .map(w -> ExploreWorkbookDto.builder()
                        .workbookId(w.getId())
                        .title(w.getTitle())
                        .workbookImgPath(w.getWorkbookImg().getPath())
                        .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(w.getId()))
                        .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(w.getId()))
                        .methodType(checkMethodType(userId, w.getId()))
                        .isScraped(checkIsScraped(userId, w.getId()))
                        .isBookmarked(checkIsBookmarked(userId, w.getId()))
                        .build())
                .collect(Collectors.toList());

        ExploreWorkbookListkDto exploreWorkbookListkDto = new ExploreWorkbookListkDto(exploreWorkbookDtoList);
        return responseUtil.successResponse(exploreWorkbookListkDto, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
    }

    public String checkMethodType(Long userId, Long workbookId) {
        UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                .orElse(null);

        return (userWorkbook == null) ? "POST" : "PATCH";
    }

    public Boolean checkIsScraped(Long userId, Long workbookId) {
        UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                .orElse(null);

        if (userWorkbook == null || !userWorkbook.getIsScraped()) {
            return false;
        } else {
            return true;
        }
    }

    public Boolean checkIsBookmarked(Long userId, Long workbookId) {
        UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                .orElse(null);

        if (userWorkbook == null || !userWorkbook.getIsBookmarked()) {
            return false;
        } else {
            return true;
        }
    }

    public TeacherWorkbookPageDto workbooksToDto(Page<Workbook> workbooks, Long userId) {
        Page<TeacherWorkbookDto> workbookList = workbooks.map(w -> TeacherWorkbookDto.builder()
                .workbookId(w.getId())
                .isOriginal(w.getCreator().getId() == userId)
                .isBookmarked(userWorkbookRepository.findByUserIdAndWorkbookIdAndIsBookmarkedIsTrue(userId , w.getId())
                        .orElse(null) == null ? false : true)
                .title(w.getTitle())
                .workbookImgPath(w.getWorkbookImg().getPath())
                .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(w.getId()))
                .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(w.getId()))
                .build());
        TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
        return teacherWorkbookPageDtoList;
    }

    public void studyToDto(List<Study> studyList, List<ClassWorkbookDto> classWorkbookDtoList) {
        LocalDateTime now = LocalDateTime.now();

        for (Study study : studyList) {
            ClassWorkbookDto classWorkbookDto = ClassWorkbookDto.builder()
                    .studyId(study.getId())
                    .title(study.getWorkbook().getTitle())
                    .workbookImgPath(study.getWorkbook().getWorkbookImg().getPath())
                    .isFinished((study.getEndTime().isAfter(now)))
                    .build();

            classWorkbookDtoList.add(classWorkbookDto);
        }
    }

    public boolean checkIsOriginal(Long creatorId, Long userId) {
        if (creatorId != userId) {
            return false;
        }
        return true;
    }

    public void userWorkbookToDto(Long userId, List<BestWorkbookDto> bestWorkbookList, List<ExploreWorkbookDto> exploreWorkbookDtoList) {
        for (BestWorkbookDto workbookDto : bestWorkbookList) {

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

            exploreWorkbookDtoList.add(exploreWorkbookDto);
        }
    }
}