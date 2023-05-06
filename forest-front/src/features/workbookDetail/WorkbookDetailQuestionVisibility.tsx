import { useState } from "react";
import Toggle from "./Toggle";
import { StyledWorkbookDetailQuestionVisibilityBox, ToggleBox } from "./WorkbookDetail.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setIsPublic } from "@/stores/workbookDetail/workbookDetail";

function WorkbookDetailQuestionVisibility() {
  const {
    workbook: { isPublic },
  } = useSelector((state: RootState) => state.workbookDetail);

  return (
    <StyledWorkbookDetailQuestionVisibilityBox>
      <span>공개 여부</span>
      <ToggleBox>
        <span>{isPublic ? "공개" : "비공개"}</span>
        <Toggle isPublic={isPublic} />
      </ToggleBox>
    </StyledWorkbookDetailQuestionVisibilityBox>
  );
}

export default WorkbookDetailQuestionVisibility;
