import { QuestionSummType } from "@/types/Workbook";
import { useRef } from "react";
import { StyledWorkbookQuestionMoveBarListBox } from "./WorkbookDetail.style";
import WorkbookQuestionMoveBar from "./WorkbookQuestionMoveBar";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

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
  const {
    workbook: { isOriginal } = { workbook: { isOriginal: false } },
    workbook: { isDeploy } = { workbook: { isDeploy: false } },
  } = useSelector((state: RootState) => state.workbookDetail);

  const handleClickMoveBar = (id: number) => {
    setCurQuestion(id);
  };

  // 드래그
  const draggingItemIndex: React.MutableRefObject<number> = useRef(-1);
  const draggingOverItemIndex: React.MutableRefObject<number> = useRef(-1);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    draggingItemIndex.current = index;

    e.dataTransfer.effectAllowed = "move";

    const target = e.target as HTMLDivElement;
    target.classList.add("grabbing");
    target.style.cursor = "grabb";
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();

    const target = e.target as HTMLDivElement;
    target.style.cursor = "grabbing";
    target.classList.add("drag-over");

    draggingOverItemIndex.current = index;

    const copyListItems = [...questionSumm]; // 1
    const dragItemContent = copyListItems[draggingItemIndex.current]; //2
    copyListItems.splice(draggingItemIndex.current, 1); //3
    copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent); // 4

    draggingItemIndex.current = draggingOverItemIndex.current;
    draggingOverItemIndex.current = -1; //5
    setQuestionSum(copyListItems);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    e.dataTransfer.dropEffect = "move";
    target.classList.remove("grabbing");
  };

  return (
    <StyledWorkbookQuestionMoveBarListBox onDragOver={(e) => onDragOver(e)}>
      {questionSumm?.map((question, i) => (
        <div
          key={`question-move-bar-${question.id}`}
          onClick={() => handleClickMoveBar(question.id)}
          onDragStart={(e) => isOriginal && !isDeploy && onDragStart(e, i)}
          onDragEnter={(e) => isOriginal && !isDeploy && onDragEnter(e, i)}
          onDragEnd={(e) => isOriginal && !isDeploy && onDragEnd(e)}
          draggable
        >
          <WorkbookQuestionMoveBar
            key={question?.id}
            num={i + 1}
            question={question}
            isSelected={question.id === curQuestion}
            questionSumm={questionSumm}
            setQuestionSum={setQuestionSum}
            setCurQuestion={setCurQuestion}
          />
        </div>
      ))}
    </StyledWorkbookQuestionMoveBarListBox>
  );
}

export default WorkbookQuestionMoveBarList;
