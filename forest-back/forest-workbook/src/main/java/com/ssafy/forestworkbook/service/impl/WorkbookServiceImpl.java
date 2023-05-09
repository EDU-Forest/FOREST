package com.ssafy.forestworkbook.service.impl;

import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.storage.*;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.util.JsonFormat;
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
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
    private final ClassUserRepository classUserRepository;
    private final ClassStudyResultRepository classStudyResultRepository;
    private final ClassAnswerRateRepository classAnswerRateRepository;
    private final ResponseUtil responseUtil;

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;
    private final Storage storage;

    // TODO 스크랩은 사본이 아님
    // TODO 출제여부는 Study에서 찾아서 쓰기
    // TODO 사본 만들기는 내거만
    // TODO 스크랩 수 -> 출제 한 횟수

    @Override
    public ResponseSuccessDto getTeacherWorkbookList(Long userId, String search, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        // 좋아하는 문제집, 스크랩한 문제집
        if (Objects.equals(search, "like")) {
            Page<UserWorkbook> userWorkbooks =
                    userWorkbookRepository.findAllByUserIdANdWorkbookIdAndIsBookmarkedOrIsScraped(userId, pageable);
            Page<TeacherWorkbookDto> workbookList = userWorkbooks.map(w -> TeacherWorkbookDto.builder()
                    .workbookId(w.getWorkbook().getId())
                    .isOriginal(checkIsOriginal(w.getWorkbook().getCreator().getId(), userId))
                    .isPublic(w.getWorkbook().getIsPublic())
                    .isBookmarked(w.getIsBookmarked())
                    .title(w.getWorkbook().getTitle())
                    .workbookImgPath(w.getWorkbook().getWorkbookImg().getPath())
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(w.getWorkbook().getId()))
                    .scrapCount(studyRepository.countByWorkbook(w.getWorkbook()))
                    .build());
            TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
        }

        // TODO 출제한 문제집
        else if (search.equals("use")) {
            studyRepository.findAllByUserId(userId);
//            Page<Study> studyList = studyRepository.findAllByUserGroupByWorkbookId(userId, pageable);
//            Page<TeacherWorkbookDto> workbookList = studyList.map(s -> TeacherWorkbookDto.builder()
//                    .workbookId(s.getWorkbook().getId())
//                    .isOriginal(s.getWorkbook().getCreator().getId() == userId)
//                    .isPublic(s.getWorkbook().getIsPublic())
//                    .isBookmarked(userWorkbookRepository.findByUserIdAndWorkbookIdAndIsBookmarkedIsTrue(userId, s.getWorkbook().getId())
//                            .orElse(null) != null)
//                    .title(s.getWorkbook().getTitle())
//                    .workbookImgPath(s.getWorkbook().getWorkbookImg().getPath())
//                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(s.getWorkbook().getId()))
//                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(s.getWorkbook().getId()))
//                    .build());
//
//            TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto<>(workbookList);
//            return responseUtil.successResponse(teacherWorkbookPageDtoList, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
            return responseUtil.successResponse( ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
        }

        // 내가 만든 문제집
        else if (search.equals("own")) {
            Page<Workbook> workbooks = workbookRepository.findAllByCreatorId(userId, pageable);
            Page<TeacherWorkbookDto> workbookList = workbooks.map(w -> TeacherWorkbookDto.builder()
                    .workbookId(w.getId())
                    .isOriginal(checkIsOriginal(w.getCreator().getId(), userId))
                    .isPublic(w.getIsPublic())
                    .isBookmarked(userWorkbookRepository.findByUserIdAndWorkbookIdAndIsBookmarkedIsTrue(userId, w.getId())
                            .orElse(null) != null)
                    .title(w.getTitle())
                    .workbookImgPath(w.getWorkbookImg().getPath())
                    .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(w.getId()))
                    .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(w.getId()))
                    .build());

            TeacherWorkbookPageDto teacherWorkbookPageDtoList = new TeacherWorkbookPageDto(workbookList);
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

        // 클래스 선생님이 아닌 경우 조회 불가
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.CLASS_NOT_FOUND));

        if (!userId.equals(classEntity.getOwner().getId())) {
            ClassUser classUser = classUserRepository.findByClassesAndUser(classEntity, user)
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.CLASS_NOT_BELONG_TO));
        }

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

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        // 공개되지 않았으면서 내가 만든 문제집이 아닌 경우 -> 조회 불가능
        if (!workbook.getCreator().getId().equals(userId) && !workbook.getIsPublic())
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_LIST);

        List<ProblemList> problemLists = problemListRepository.findAllByWorkbookId(workbookId);
        List<ProblemAllInfoDto> problemAllInfoDtoList = new ArrayList<>();

        for (ProblemList problemList : problemLists) {
            Problem problem = problemRepository.findById(problemList.getProblem().getId())
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEM));

            List<Item> itemList = itemRepository.findAllByProblemIdOrderByNo(problem.getId());
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
                .workbookImgId(workbook.getWorkbookImg().getId())
                .workbookImgPath(workbook.getWorkbookImg().getPath())
                .description(workbook.getDescription())
                .volume(workbook.getVolume())
                .isPublic(workbook.getIsPublic())
                .isDeploy(workbook.getIsDeploy())
                .iSBookmarked(userWorkbookRepository.findByUserIdAndWorkbookIdAndIsBookmarkedIsTrue(userId, workbook.getId())
                        .orElse(null) != null)
                .isOriginal(checkIsOriginal(workbook.getCreator().getId(), userId))
                .bookmarkCount(userWorkbookRepository.countByWorkbookIdAndIsBookmarkedIsTrue(workbook.getId()))
                .scrapCount(userWorkbookRepository.countByWorkbookIdAndIsScrapedIsTrue(workbook.getId()))
                .build();

        WorkbookToDto workbookToDto = WorkbookToDto.builder()
                .workbookInfo(workbookInfoDto)
                .problemList(problemAllInfoDtoList)
                .build();

        return responseUtil.successResponse(workbookToDto, ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
    }

    @Override
    public ResponseSuccessDto<?> getWorkbookImg() {
        List<WorkbookImg> workbookImgList = workbookImgRepository.findAll();

        List<ImgDto> ImgDtoList = workbookImgList.stream()
                .map(w -> ImgDto.builder()
                        .workbookImgId(w.getId())
                        .workbookImgPath(w.getPath())
                        .build())
                .collect(Collectors.toList());

        return responseUtil.successResponse(new ImgListDto(ImgDtoList), ForestStatus.WORKBOOK_SUCCESS_GET_LIST);
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
                .workbookImgId(workbook.getWorkbookImg().getId())
                .workbookImgPath(workbookImg.getPath())
                .description(workbook.getDescription())
                .isPublic(workbook.getIsPublic())
                .isDeploy(false)
                .iSBookmarked(userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbook.getId())
                        .orElse(null) != null)
                .isOriginal(checkIsOriginal(workbook.getCreator().getId(), userId))
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

        if (!userId.equals(workbook.getCreator().getId())) {
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
        if (!user.getId().equals(workbook.getCreator().getId()))  {
            UserWorkbook userWorkbook = userWorkbookRepository.findByUserIdAndWorkbookId(userId, workbookId)
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_USERWORKBOOK));
            userWorkbook.updateIsBookmarked(false);
            userWorkbook.updateIsScraped(false);
        }

        // 내 문제집인 경우 - 삭제, 유저 북마크 전체 삭제
        else {
            workbook.changeIsDeleted(true);
//            workbookRepository.deleteById(workbookId);
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
        if (!workbook.getCreator().getId().equals(userId)) {
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
    public ResponseSuccessDto<?> executeWorkbook(Long userId, ExecuteDto executeDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(executeDto.getWorkbookId())
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        List<ClassEntity> classEntityList = new ArrayList<>();
        for (ClassIdDto classId : executeDto.getClassIdList()) {
            ClassEntity classEntity = classRepository.findById(classId.getClassId())
                    .orElseThrow(() -> new CustomException(WorkbookErrorCode.CLASS_NOT_FOUND));
            classEntityList.add(classEntity);
        }

        EnumStudyTypeStatus enumStudyTypeStatus;

        if (executeDto.getType().equals("exam")) {
            enumStudyTypeStatus = EnumStudyTypeStatus.EXAM;
        } else if (executeDto.getType().equals("homework")) {
            enumStudyTypeStatus = EnumStudyTypeStatus.HOMEWORK;
        } else if (executeDto.getType().equals("self")) {
            enumStudyTypeStatus = EnumStudyTypeStatus.SELF;
        } else {
            throw new CustomException(WorkbookErrorCode.STUDY_TYPE_NO_VAILD);
        }

        // 내 문제집만 출제 여부 변경
        if (userId.equals(workbook.getCreator().getId()))  {
            workbook.changeIsExecuted(true);
        }

        List<StudyIdDto> studyIdDtoList = new ArrayList<>();
        List<ProblemList> problemListList = problemListRepository.findAllByWorkbookId(workbook.getId());

        for (ClassEntity classEntity : classEntityList) {
            Study study = Study.builder()
                    .classes(classEntity)
                    .workbook(workbook)
                    .user(user)
                    .name(executeDto.getName())
                    .type(enumStudyTypeStatus)
                    .startTime(executeDto.getStartTime() == null ?
                            LocalDateTime.now() : executeDto.getStartTime())
                    .endTime(executeDto.getEndTime())
                    .build();

            studyRepository.save(study);

            ClassStudyResult classStudyResult = ClassStudyResult.builder()
                    .study(study).build();

            classStudyResultRepository.save(classStudyResult);

            StudyIdDto studyIdDto = StudyIdDto.builder().studyId(study.getId()).build();

            List<ClassAnswerRate> classAnswerRateList = new ArrayList<>();
            for (ProblemList problemList : problemListList) {
                ClassAnswerRate classAnswerRate = ClassAnswerRate.builder()
                        .study(study)
                        .problemList(problemList)
                        .build();
                classAnswerRateList.add(classAnswerRate);
            }

            classAnswerRateRepository.saveAll(classAnswerRateList);
            studyIdDtoList.add(studyIdDto);
        }

        return responseUtil.successResponse(new StudyIdListDto(studyIdDtoList), ForestStatus.WORKBOOK_SUCCESS_EXECUTE);
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
    public ResponseSuccessDto<?> deployWorkbook(Long userId, Long workbookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        Workbook workbook = workbookRepository.findById(workbookId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_NOT_FOUND));

        // 내가 만든 문제집만 배포 가능
        if (!workbook.getCreator().getId().equals(userId)) {
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

        // 내가 만든 문제집만 사본 생성 가능
        if (!workbook.getCreator().getId().equals(userId))
            throw new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_COPY);

        Workbook workbookCopy = Workbook.builder()
                .workbookImg(workbook.getWorkbookImg())
                .creator(workbook.getCreator())
                .title(workbook.getTitle())
                .description(workbook.getDescription())
                .volume(workbook.getVolume())
                .build();

        workbookRepository.save(workbookCopy);

        if (!workbookCopy.getCreator().getId().equals(userId)) {
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

                List<Item> itemList = itemRepository.findAllByProblemIdOrderByNo(problemLists.get(checked).getId());
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
                .workbookImgId(workbookCopy.getWorkbookImg().getId())
                .workbookImgPath(workbookCopy.getWorkbookImg().getPath())
                .description(workbookCopy.getDescription())
                .volume(workbookCopy.getVolume())
                .isPublic(workbookCopy.getIsPublic())
                .isDeploy(false)
                .iSBookmarked(userWorkbookRepository.findByUserIdAndWorkbookIdAndIsBookmarkedIsTrue(userId, workbook.getId())
                        .orElse(null) != null)
                .isOriginal(checkIsOriginal(userId, workbook.getCreator().getId()))
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
                .workbookInfo(workbookInfoDto)
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

        if (!userId.equals(workbook.getCreator().getId())) {
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

            // 문제 ID 오는 경우 수정
            if (problemDto.getProblemId() != null) {
                Problem problem = problemRepository.findById(problemDto.getProblemId())
                        .orElseThrow(() -> new CustomException(WorkbookErrorCode.WORKBOOK_FAIL_GET_PROBLEM));

                problem.updateProblem(enumProblemTypeStatus, problemDto.getTitle(), problemDto.getPath(),
                        problemDto.getText(), problemDto.getAnswer(), problemDto.getPoint());

                for (ItemContentDto itemContentDto : problemDto.getItemList()) {
                    Item item = itemRepository.findByProblemAndNo(problem, itemContentDto.getItemNo())
                            .orElse(null);

                    // item 없는 경우 -> 생성
                    if (item == null) {
                        Item createItem = Item.builder()
                                .problem(problem)
                                .no(itemContentDto.getItemNo())
                                .content(itemContentDto.getContent())
                                .isImage(itemContentDto.getIsImage())
                                .build();
                        itemRepository.save(createItem);
                    }

                    // item 있는 경우 -> 수정
                    else {
                        item.updateItem(itemContentDto.getItemNo(), itemContentDto.getContent(), itemContentDto.getIsImage());
                    }
                }
            }

            // 문제 ID 없는 경우 생성
            else {
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

                // 문제 만들기
                ProblemList problemList = ProblemList.builder()
                        .workbook(workbook)
                        .problem(problem)
                        .problemNum(problemDto.getProblemNo())
                        .build();

                problemListRepository.save(problemList);
            }
        }

        workbook.updateVolume(problemUpdateInfoDto.getProblemList().size());

        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_CREATE);
    }

    @Override
    public ResponseSuccessDto<?> createProblemImg(Long userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        String path = fileToUrl(file);

        ImagePathDto imagePathDto = ImagePathDto.builder()
                .path("https://storage.googleapis.com/" + path)
                .build();

        return responseUtil.successResponse(imagePathDto, ForestStatus.WORKBOOK_SUCCESS_UPLOAD_IMG);
    }

    public ResponseSuccessDto<?> ocrImg(Long userId, MultipartFile file) throws IOException {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        String path = fileToUrl(file);
        String filePath = "gs://" + path;

//        String filePath = "gs://forest_ocr_bucket/046a5cf3-789f-4e3c-929f-fdbb94f6cee7";
//        String filePath = "gs://forest_ocr_bucket/0f794bc0-a6e6-4abf-b98c-147731dee552";
//        String filePath = "gs://forest_ocr_bucket/427f9ffb-1e7d-4f29-a575-bbc27f10b543";

        List<AnnotateImageRequest> requests = new ArrayList<>();

        ImageSource imgSource = ImageSource.newBuilder().setGcsImageUri(filePath).build();

        Image img = Image.newBuilder().setSource(imgSource).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();
            ArrayList<Object> originList = new ArrayList<>();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    throw new IllegalArgumentException("실패");
                }

                System.out.println("시작");
                System.out.format("Text: %s%n", res.getTextAnnotationsList().get(0).getDescription());

                // 사용가능한 annotations 전체 목록 참고 : http://g.co/cloud/vision/docs
                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {

                    System.out.format("Text: %s%n", annotation.getDescription());
                    System.out.println("??????????");
                    System.out.format("Position : %s%n", annotation.getBoundingPoly());
                    System.out.println("--------------");
                    // 데이터를 배열에 add
                    originList.add(annotation.getDescription());
                }
            }
            // 배열의 0번째 값에 모든 데이터들이 text형식으로 담긴다
            String[] txt = originList.get(0).toString().split("\\n");
            int j = 0;
            boolean isMultiple = false;
            boolean isTitle = false;

            for (int i = 0; i < txt.length; i++) {
                String temp = txt[i];

                // 점수 확인
                if (temp.contains("[")) {
                    int start = temp.indexOf('[');
                    int end = temp.indexOf(']');
                    System.out.println("점수 : " + temp.substring(start+1, end));
                }

                // 문제 확인
                if (!isTitle && temp.contains("?")) {
                    System.out.println("문제 제목임");
                }


                // 문장에 숫자 포함 여부
                if (temp.matches(".*[0-9].*")) {
                    System.out.println("숫자가 포함됩니당.");

                    // 숫자로 시작여부
                    if (temp.substring(0, 1).matches("^[0-9]+$")) {
                        System.out.println("번호입니당");

                        // 문제 번호
                        if (j == 0) {
                            int end = temp.indexOf('.');
                            System.out.println(end);
//                            System.out.println("번호: " + temp.substring(0, end));
                            j++;
                        }

                        // 항목 번호
                        else if (j > 0 && txt.length - i <= 5){
                            System.out.println("항목 : " + temp);
                            isMultiple = true;
                        }
                    }

                    // 중간에 항목이거나 지문 중 숫자이거나
                    else {
                        
                    }
                }



                // 마지막 내용 숫자 인식 안될 경우
                if (isMultiple && i == txt.length - 1) {
                    System.out.println("마지막");
                    System.out.println(temp);
                }
            }
            System.out.println(Arrays.toString(txt));
            return responseUtil.successResponse(Arrays.toString(txt), ForestStatus.WORKBOOK_SUCCESS_UPLOAD_OCR);
        } catch (IOException e) {
            e.printStackTrace();
            throw new CustomException(WorkbookErrorCode.WORKBOOK_OCR_FAIL);
        }
    }

    public ResponseSuccessDto<?> detectDocumentsGcs(MultipartFile file) throws Exception {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new CustomException(WorkbookErrorCode.AUTH_USER_NOT_FOUND));

        String uuid = UUID.randomUUID().toString();
        String path = fileToUrl(file);

//        String gcsSourcePath = "gs://cloud-samples-data/vision/pdf_tiff/census2010.pdf";
        String gcsSourcePath = "gs://" + path;
        String gcsDestinationPath = "gs://forest_ocr_bucket/"+uuid;

        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests. After completing all of your requests, call
        // the "close" method on the client to safely clean up any remaining background resources.
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            List<AsyncAnnotateFileRequest> requests = new ArrayList<>();

            // Set the GCS source path for the remote file.
            GcsSource gcsSource = GcsSource.newBuilder().setUri(gcsSourcePath).build();

            // Create the configuration with the specified MIME (Multipurpose Internet Mail Extensions)
            // types
            InputConfig inputConfig =
                    InputConfig.newBuilder()
                            .setMimeType(
                                    "application/pdf") // Supported MimeTypes: "application/pdf", "image/tiff"
                            .setGcsSource(gcsSource)
                            .build();

            // Set the GCS destination path for where to save the results.
            GcsDestination gcsDestination =
                    GcsDestination.newBuilder().setUri(gcsDestinationPath).build();

            // Create the configuration for the System.output with the batch size.
            // The batch size sets how many pages should be grouped into each json System.output file.
            OutputConfig outputConfig =
                    OutputConfig.newBuilder().setBatchSize(2).setGcsDestination(gcsDestination).build();

            // Select the Feature required by the vision API
            Feature feature = Feature.newBuilder().setType(Feature.Type.DOCUMENT_TEXT_DETECTION).build();

            // Build the OCR request
            AsyncAnnotateFileRequest request =
                    AsyncAnnotateFileRequest.newBuilder()
                            .addFeatures(feature)
                            .setInputConfig(inputConfig)
                            .setOutputConfig(outputConfig)
                            .build();

            requests.add(request);

            // Perform the OCR request
            OperationFuture<AsyncBatchAnnotateFilesResponse, OperationMetadata> response =
                    client.asyncBatchAnnotateFilesAsync(requests);

            System.out.println("Waiting for the operation to finish.");

            // Wait for the request to finish. (The result is not used, since the API saves the result to
            // the specified location on GCS.)
            List<AsyncAnnotateFileResponse> result =
                    response.get(180, TimeUnit.SECONDS).getResponsesList();

            // Once the request has completed and the System.output has been
            // written to GCS, we can list all the System.output files.
            Storage storage = StorageOptions.getDefaultInstance().getService();

            // Get the destination location from the gcsDestinationPath
            Pattern pattern = Pattern.compile("gs://([^/]+)/(.+)");
            Matcher matcher = pattern.matcher(gcsDestinationPath);

            if (matcher.find()) {
                String bucketName = matcher.group(1);
                String prefix = matcher.group(2);

                // Get the list of objects with the given prefix from the GCS bucket
                Bucket bucket = storage.get(bucketName);
                com.google.api.gax.paging.Page<Blob> pageList = bucket.list(Storage.BlobListOption.prefix(prefix));

                Blob firstOutputFile = null;

                // List objects with the given prefix.
                System.out.println("Output files:");
                for (Blob blob : pageList.iterateAll()) {
                    System.out.println(blob.getName());

                    // Process the first System.output file from GCS.
                    // Since we specified batch size = 2, the first response contains
                    // the first two pages of the input file.
                    if (firstOutputFile == null) {
                        firstOutputFile = blob;

                    }
                }

                // Get the contents of the file and convert the JSON contents to an AnnotateFileResponse
                // object. If the Blob is small read all its content in one request
                // (Note: the file is a .json file)
                // Storage guide: https://cloud.google.com/storage/docs/downloading-objects
                String jsonContents = new String(firstOutputFile.getContent());

                AnnotateFileResponse.Builder builder = AnnotateFileResponse.newBuilder();
                JsonFormat.parser().merge(jsonContents, builder);


                // Build the AnnotateFileResponse object
                AnnotateFileResponse annotateFileResponse = builder.build();

                // Parse through the object to get the actual response for the first page of the input file.
                AnnotateImageResponse annotateImageResponse = annotateFileResponse.getResponses(0);

                // Here we print the full text from the first page.
                // The response contains more information:
                // annotation/pages/blocks/paragraphs/words/symbols
                // including confidence score and bounding boxes
                System.out.format("%nText: %s%n", annotateImageResponse.getFullTextAnnotation().getText());
            } else {
                System.out.println("No MATCH");

            }
        }
        return responseUtil.successResponse(ForestStatus.WORKBOOK_SUCCESS_UPLOAD_OCR);
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

        if (!workbook.getCreator().getId().equals(userId)) {
            throw new CustomException(WorkbookErrorCode.WORKBOOK_NOT_OWN);
        }

        List<Item> itemList = itemRepository.findAllByProblemIdOrderByNo(problemId);

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
                        .isDeploy(w.getIsDeploy())
                        .isExecute(studyRepository.findTop1ByWorkbookId(w.getId())
                                .orElse(null) != null) // 내 클래스에서 출제 했는지 여부
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

    public void studyToDto(List<Study> studyList, List<ClassWorkbookDto> classWorkbookDtoList) {
        LocalDateTime now = LocalDateTime.now();

        for (Study study : studyList) {
            ClassWorkbookDto classWorkbookDto = ClassWorkbookDto.builder()
                    .studyId(study.getId())
                    .title(study.getName())
                    .workbookImgPath(study.getWorkbook().getWorkbookImg().getPath())
                    .isFinished(study.getType().equals(EnumStudyTypeStatus.SELF) ? false : study.getEndTime ().isAfter(now))
                    .build();

            classWorkbookDtoList.add(classWorkbookDto);
        }
    }

    public boolean checkIsOriginal(Long creatorId, Long userId) {
        if (!creatorId.equals(userId)) {
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

    public String fileToUrl(MultipartFile file) throws IOException {
        String uuid = UUID.randomUUID().toString(); // Google Cloud Storage에 저장될 파일 이름
        String ext = file.getContentType(); // 파일의 형식 ex) JPG
        System.out.println(ext);

        // Cloud에 파일 업로드
        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder(bucketName, uuid)
                        .setContentType(ext)
                        .build(),
                file.getInputStream()
        );

        log.info("파일 업로드 완료 : {}", uuid);

        return bucketName + "/" + uuid;
    }
}