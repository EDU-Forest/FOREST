import { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { StyledWorkbookDetailQuestionVisibilityBox, ToggleBox } from "./WorkbookDetail.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

function WorkbookDetailQuestionVisibility() {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    if (isPublic !== workbook?.isPublic) {
      setIsPublic(workbook?.isPublic);
    }
  }, [workbook?.isPublic]);

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
