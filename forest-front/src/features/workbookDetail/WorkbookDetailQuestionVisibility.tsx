import { useState } from "react";
import Toggle from "./Toggle";
import { StyledWorkbookDetailQuestionVisibilityBox, ToggleBox } from "./WorkbookDetail.style";

function WorkbookDetailQuestionVisibility() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <StyledWorkbookDetailQuestionVisibilityBox>
      <span>공개 여부</span>
      <ToggleBox>
        <span>{isPublic ? "공개" : "비공개"}</span>
        <Toggle isPublic={isPublic} setIsPublic={setIsPublic} />
      </ToggleBox>
    </StyledWorkbookDetailQuestionVisibilityBox>
  );
}

export default WorkbookDetailQuestionVisibility;
