import { QuestionSummType } from "@/types/Workbook";
import { useRef } from "react";
import { StyledWorkbookQuestionMoveBarListBox } from "./WorkbookDetail.style";
import WorkbookQuestionMoveBar from "./WorkbookQuestionMoveBar";

interface IProps {
  questionSumm: QuestionSummType[];
  setQuestionSum: React.Dispatch<React.SetStateAction<QuestionSummType[]>>;
  curQuestion: number;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
}

function WorkbookQuestionMoveBarList({
  questionSumm,
  setQuestionSum,
  curQuestion,
  setCurQuestion,
}: IProps) {
  const handleClickMoveBar = (id: number) => {
    setCurQuestion(id);
  };

  // 드래그
  const draggingItemIndex: React.MutableRefObject<number> = useRef(-1);
  const draggingOverItemIndex: React.MutableRefObject<number> = useRef(-1);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    draggingItemIndex.current = index;

    const target = e.target as HTMLDivElement;
    target.classList.add("grabbing");
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    draggingOverItemIndex.current = index;

    const copyListItems = [...questionSumm]; // 1
    const dragItemContent = copyListItems[draggingItemIndex.current]; //2
    copyListItems.splice(draggingItemIndex.current, 1); //3
    copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent); // 4

    draggingItemIndex.current = draggingOverItemIndex.current;
    draggingOverItemIndex.current = -1; //5
    setQuestionSum(copyListItems);
  };

  return (
    <StyledWorkbookQuestionMoveBarListBox>
      {questionSumm.map((question, i) => (
        <div
          key={question.id}
          onClick={() => handleClickMoveBar(question.id)}
          onDragStart={(e) => onDragStart(e, i)}
          onDragEnter={(e) => onDragEnter(e, i)}
          draggable
        >
          <WorkbookQuestionMoveBar
            key={question?.id}
            num={i + 1}
            question={question}
            isSelected={question.id === curQuestion}
          />
        </div>
      ))}
    </StyledWorkbookQuestionMoveBarListBox>
  );
}

export default WorkbookQuestionMoveBarList;
