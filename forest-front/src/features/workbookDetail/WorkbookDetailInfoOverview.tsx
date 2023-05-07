import { StyledTextBtn } from "@/components/Button/Btn.style";
import {
  WorkbookContent,
  WorkbookContentWrapper,
  WorkbookIcon,
} from "@/components/Workbook/Workbook.style";
import { useEffect, useState } from "react";
import {
  StyledWorkbookBtnsBox,
  StyledWorkbookDetailDescBox,
  StyledWorkbookDetailInfoOverviewBox,
  StyledWorkbookReactionBtnsBox,
  WorkbookDetailWorkbookImgBox,
  WorkbookImgTypeBox,
} from "./WorkbookDetail.style";
import { CommonInput } from "@/components/Input/Input.style";
import { EditorQuestionImgAddedBox } from "../editor/EditorQuestionContent.style";
import WorkbookImgEditModal from "./WorkbookImgEditModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { setWorkbook } from "@/stores/workbookDetail/workbookDetail";
import WorkbookDeleteModal from "./WorkbookDeleteModal";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import useBookmarkPatch from "@/apis/search/useBookmarkPatch";
import useBookmarkPost from "@/apis/search/useBookmarkPost";
import useBookmarkDelete from "@/apis/search/useBookmarkDelete";

interface IProps {
  id: number;
  cover: string;
  likeCnt: number;
  usedCnt: number;
}

function WorkbookDetailInfoOverview({ id, cover, likeCnt, usedCnt }: IProps) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const [selectedImg, setSelectedImg] = useState(0);

  const [isOpenImgEdit, setIsOpenImgEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  // true(접혀있는 상태)라면 '펼치기' 문구
  // false(펼쳐져있는 상태)라면 '접기' 문구
  const [isFolded, setIsFolded] = useState(true);

  const handleClickFold = () => {
    setIsFolded(!isFolded);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setWorkbook({ ...workbook, title: e.target.value }));
  };
  const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setWorkbook({ ...workbook, description: e.target.value }));
  };

  const handleClickEditing = () => {
    setIsEditing(true);
  };
  const handleClickEditConfirm = () => {
    setIsEditing(false);
  };
  const handleClickImgEdit = () => {
    setIsOpenImgEdit(true);
  };
  const handleClickDelete = () => {
    setIsOpenDelete(true);
  };

  const patchMutate = useBookmarkPatch().mutate;
  const postMutate = useBookmarkPost().mutate;
  const deleteMutate = useBookmarkDelete().mutate;

  const pressHeart = () => {
    if (workbook.isBookmarked) {
      deleteMutate(id);
      return;
    }
    // if (methodType === "POST") {
    postMutate(id);
    // } else {
    //   patchMutate(id);
    // }
  };

  useEffect(() => {
    dispatch(
      setWorkbook({ ...workbook, workbookImgPath: selectedImg, workbookImgId: selectedImg }),
    );
  }, [selectedImg]);

  return (
    <>
      <StyledWorkbookDetailInfoOverviewBox>
        <div>
          {isEditing ? (
            <CommonInput value={workbook.title} onChange={handleChangeTitle}></CommonInput>
          ) : (
            <div>{workbook.title}</div>
          )}
          <StyledWorkbookBtnsBox>
            {(workbook.bookmarkCount || workbook.bookmarkCount === 0) && (
              <WorkbookContentWrapper>
                <WorkbookContent bg>
                  <span>{workbook.scrapCount} </span>
                  명이 이용 중이에요
                </WorkbookContent>
                {/* 공개된 문제집만 북마크 가능 */}
                {workbook.isPublic && (
                  <div>
                    <WorkbookIcon onClick={pressHeart}>
                      {workbook.isBookmarked ? <BsSuitHeartFill /> : <BsSuitHeart />}
                    </WorkbookIcon>
                    <WorkbookContent>{workbook.bookmarkCount}</WorkbookContent>
                  </div>
                )}
              </WorkbookContentWrapper>
            )}
            {/* <StyledWorkbookReactionBtnsBox>
              <div>
                <WorkbookIcon>🧡</WorkbookIcon>
                {likeCnt}
              </div>
              <div>
                <WorkbookIcon>📝</WorkbookIcon>
                {usedCnt}
              </div>
            </StyledWorkbookReactionBtnsBox> */}
            {workbook.isOriginal && !workbook.isDeploy && (
              <div>
                {isEditing ? (
                  <StyledTextBtn onClick={handleClickEditConfirm}>확인</StyledTextBtn>
                ) : (
                  <StyledTextBtn onClick={handleClickEditing}>수정</StyledTextBtn>
                )}
                <span>|</span>
                <StyledTextBtn onClick={handleClickDelete}>삭제</StyledTextBtn>
              </div>
            )}
          </StyledWorkbookBtnsBox>
          <StyledWorkbookDetailDescBox isFolded={isFolded}>
            {isEditing ? (
              <CommonInput value={workbook.description} onChange={handleChangeDesc} />
            ) : (
              <>{workbook.description}</>
            )}
          </StyledWorkbookDetailDescBox>
        </div>
        <div>
          <EditorQuestionImgAddedBox>
            {!isFolded && (
              <WorkbookDetailWorkbookImgBox>
                {selectedImg === 0 ? (
                  <img src={workbook.workbookImgPath} />
                ) : (
                  <WorkbookImgTypeBox type={selectedImg}>{workbook.title}</WorkbookImgTypeBox>
                )}
                {isEditing && <label onClick={handleClickImgEdit}>수정</label>}
              </WorkbookDetailWorkbookImgBox>
            )}
          </EditorQuestionImgAddedBox>
          <StyledTextBtn onClick={handleClickFold}>{isFolded ? "펼치기" : "접기"}</StyledTextBtn>
        </div>
      </StyledWorkbookDetailInfoOverviewBox>
      {isOpenImgEdit && (
        <WorkbookImgEditModal
          title={workbook.title}
          setSelectedImg={setSelectedImg}
          setIsOpenImgEdit={setIsOpenImgEdit}
        />
      )}
      {isOpenDelete && <WorkbookDeleteModal setIsOpenDelete={setIsOpenDelete} />}
    </>
  );
}

export default WorkbookDetailInfoOverview;
