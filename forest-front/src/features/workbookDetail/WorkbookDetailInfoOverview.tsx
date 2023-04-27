import { StyledTextBtn } from "@/components/Button/Btn.style";
import { WorkbookIcon } from "@/components/Workbook/Workbook.style";
import { useState } from "react";
import {
  StyledWorkbookBtnsBox,
  StyledWorkbookDetailCoverBox,
  StyledWorkbookDetailDescBox,
  StyledWorkbookDetailInfoOverviewBox,
  StyledWorkbookReactionBtnsBox,
} from "./WorkbookDetail.style";

interface IProps {
  id: number;
  title: String;
  desc: String;
  cover: String;
  likeCnt: number;
  usedCnt: number;
}

function WorkbookDetailInfoOverview({ id, cover, title, desc, likeCnt, usedCnt }: IProps) {
  // true(접혀있는 상태)라면 '펼치기' 문구
  // false(펼쳐져있는 상태)라면 '접기' 문구
  const [isFolded, setIsFolded] = useState(true);

  const handleClickFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <StyledWorkbookDetailInfoOverviewBox>
      <div>
        <div>{title}</div>
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
            <StyledTextBtn>수정</StyledTextBtn>
            <span>|</span>
            <StyledTextBtn>삭제</StyledTextBtn>
          </div>
        </StyledWorkbookBtnsBox>
        <StyledWorkbookDetailDescBox isFolded={isFolded}>{desc}</StyledWorkbookDetailDescBox>
      </div>
      <div>
        <StyledWorkbookDetailCoverBox src="/images/workbook.png" isFolded={isFolded} />
        <StyledTextBtn onClick={handleClickFold}>{isFolded ? "펼치기" : "접기"}</StyledTextBtn>
      </div>
    </StyledWorkbookDetailInfoOverviewBox>
  );
}

export default WorkbookDetailInfoOverview;
