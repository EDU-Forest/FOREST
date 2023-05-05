import { StyledTextBtn } from "@/components/Button/Btn.style";
import { WorkbookIcon } from "@/components/Workbook/Workbook.style";
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
  const [editedImg, setEditedImg] = useState<string>("");
  const [selectedImg, setSelectedImg] = useState(0);

  const [isOpenImgEdit, setIsOpenImgEdit] = useState(false);
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

  useEffect(() => {
    setEditedImg(`/images/Workbook_Type_${selectedImg}.png`);
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
            <StyledWorkbookReactionBtnsBox>
              <div>
                <WorkbookIcon>🧡</WorkbookIcon>
                {likeCnt}
              </div>
              <div>
                <WorkbookIcon>📝</WorkbookIcon>
                {usedCnt}
              </div>
            </StyledWorkbookReactionBtnsBox>
            <div>
              {isEditing ? (
                <StyledTextBtn onClick={handleClickEditConfirm}>확인</StyledTextBtn>
              ) : (
                <StyledTextBtn onClick={handleClickEditing}>수정</StyledTextBtn>
              )}
              <span>|</span>
              <StyledTextBtn>삭제</StyledTextBtn>
            </div>
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
                  <img src={cover} />
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
    </>
  );
}

export default WorkbookDetailInfoOverview;
