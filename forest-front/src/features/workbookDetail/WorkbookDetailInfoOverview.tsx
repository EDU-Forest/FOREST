import useBookmarkDelete from "@/apis/search/useBookmarkDelete";
import useBookmarkPost from "@/apis/search/useBookmarkPost";
import { StyledTextBtn } from "@/components/Button/Btn.style";
import { CommonInput } from "@/components/Input/Input.style";
import {
  WorkbookContent,
  WorkbookContentWrapper,
  WorkbookIcon,
} from "@/components/Workbook/Workbook.style";
import { RootState } from "@/stores/store";
import { setWorkbook } from "@/stores/workbookDetail/workbookDetail";
import { TextMaxCnt } from "@/styles/text";
import { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { EditorQuestionImgAddedBox } from "../editor/EditorQuestionContent.style";
import WorkbookDeleteModal from "./WorkbookDeleteModal";
import {
  StyledWorkbookBtnsBox,
  StyledWorkbookDetailDescBox,
  StyledWorkbookDetailInfoOverviewBox,
  WorkbookDetailWorkbookImgBox,
  WorkbookImgTypeBox,
} from "./WorkbookDetail.style";
import WorkbookImgEditModal from "./WorkbookImgEditModal";
import { titleFormatter } from "@/utils";

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
  const [imgPath, setImgPath] = useState("");
  const [isEditValidConfirm, setIsEditValidConfirm] = useState(true);
  const titleMaxCnt = 30;
  const descMaxCnt = 255;

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
    setIsEditValidConfirm(e.target.value ? true : false);
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

  const postMutate = useBookmarkPost(true).mutate;
  const deleteMutate = useBookmarkDelete(true).mutate;

  const pressHeart = () => {
    if (workbook?.isBookmarked) {
      deleteMutate(id);
      return;
    }
    postMutate(id);
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
            <>
              <CommonInput
                value={workbook?.title}
                maxLength={titleMaxCnt}
                onChange={handleChangeTitle}
              ></CommonInput>
              <TextMaxCnt>
                {workbook?.title.length} / {titleMaxCnt}자
              </TextMaxCnt>
            </>
          ) : (
            <div>{workbook?.title}</div>
          )}
          <StyledWorkbookBtnsBox>
            {(workbook?.bookmarkCount || workbook?.bookmarkCount === 0) && (
              <WorkbookContentWrapper>
                <WorkbookContent bg>
                  <span>{workbook?.scrapCount} </span>
                  명이 이용 중이에요
                </WorkbookContent>
                {/* 공개된 문제집만 북마크 가능 */}
                {workbook?.isPublic && (
                  <div>
                    <WorkbookIcon onClick={pressHeart}>
                      {workbook?.isBookmarked ? <BsSuitHeartFill /> : <BsSuitHeart />}
                    </WorkbookIcon>
                    <WorkbookContent>{workbook?.bookmarkCount}</WorkbookContent>
                  </div>
                )}
              </WorkbookContentWrapper>
            )}
            {workbook?.isOriginal && !workbook?.isDeploy && (
              <div>
                {isEditing ? (
                  <StyledTextBtn
                    onClick={() => isEditValidConfirm && handleClickEditConfirm()}
                    isValidFail={!isEditValidConfirm}
                  >
                    확인
                  </StyledTextBtn>
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
              <>
                <CommonInput value={workbook?.description} onChange={handleChangeDesc} />
                <TextMaxCnt>
                  {workbook?.description ? workbook.description.length : 0} / {descMaxCnt}자
                </TextMaxCnt>
              </>
            ) : (
              <>{workbook?.description}</>
            )}
          </StyledWorkbookDetailDescBox>
        </div>
        <div>
          <EditorQuestionImgAddedBox>
            {!isFolded && (
              <WorkbookDetailWorkbookImgBox>
                {selectedImg === 0 ? (
                  <img src={workbook?.workbookImgPath} />
                ) : (
                  <WorkbookImgTypeBox path={imgPath}>
                    {titleFormatter(workbook?.title)}
                  </WorkbookImgTypeBox>
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
          title={workbook?.title}
          setSelectedImg={setSelectedImg}
          setIsOpenImgEdit={setIsOpenImgEdit}
          imgPath={imgPath}
          setImgPath={setImgPath}
        />
      )}
      {isOpenDelete && <WorkbookDeleteModal setIsOpenDelete={setIsOpenDelete} />}
    </>
  );
}

export default WorkbookDetailInfoOverview;
