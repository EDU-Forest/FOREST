import { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { StyledWorkbookDetailQuestionVisibilityBox, ToggleBox } from "./WorkbookDetail.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
// git conflict
// import { useDispatch } from "react-redux";
// import { setIsPublic } from "@/stores/workbookDetail/workbookDetail";

function WorkbookDetailQuestionVisibility() {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const [isPublic, setIsPublic] = useState(true); 

  // git conflict
  // function WorkbookDetailQuestionVisibility() {
  //   const {
  //     workbook: { isPublic },
  //   } = useSelector((state: RootState) => state.workbookDetail);

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
        <Toggle isPublic={isPublic} setIsPublic={setIsPublic}/>
      </ToggleBox>
    </StyledWorkbookDetailQuestionVisibilityBox>
  );
}

export default WorkbookDetailQuestionVisibility;
