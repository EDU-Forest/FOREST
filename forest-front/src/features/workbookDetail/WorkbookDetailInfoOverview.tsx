import { StyledTextBtn } from "@/components/Button/Btn.style";
import { WorkbookIcon, WorkbookImg } from "@/components/Workbook/Workbook.style";
import {
  StyledWorkbookBtnsBox,
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
        <div>{desc}</div>
      </div>
      <div>
        <WorkbookImg src="/images/workbook.png" />
        <StyledTextBtn>접기</StyledTextBtn>
      </div>
    </StyledWorkbookDetailInfoOverviewBox>
  );
}

export default WorkbookDetailInfoOverview;
