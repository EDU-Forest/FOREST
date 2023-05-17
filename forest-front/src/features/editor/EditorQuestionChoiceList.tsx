import {
  setDeleteAnswers,
  setIsAnswerValidConfirm,
  setQuestions,
} from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionItemType, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ClassInputMsg } from "../class/teacher/AddClassModal.style";
import EditorItemImg from "./EditorItemImg";
import EditorItemToggleBtn from "./EditorItemToggleBtn";
import {
  EditorChoiceNumBox,
  EditorQuestionChoiceBox,
  EditorQuestionChoiceListBox,
} from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
  items: QuestionItemType[];
  setItems: React.Dispatch<React.SetStateAction<QuestionItemType[]>>;
  itemChange: (item: QuestionItemType[]) => void;
}

function EditorQuestionChoiceList({ question, items, setItems, itemChange }: IProps) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [correct, setCorrect] = useState(0);

  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const { deleteAnswers } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  useEffect(() => {
    setCorrect(Number(question.answer));
  }, [question]);

  useEffect(() => {
    dispatch(setIsAnswerValidConfirm(correct ? true : false));
  }, [correct]);

  const handleChangeItem = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const copyArr = [...items];
    copyArr.splice(i, 1, { ...copyArr[i], content: e.target.value });
    setItems([...copyArr]);

    itemChange([...copyArr]);
  };

  const handleClickDelete = (id: number, i: number) => {
    setItems(items.filter((item, idx) => idx !== i));

    itemChange(items.filter((item, idx) => idx !== i));

    // 새로 만들어진 item은 id가 0. DB에 저장되어 있는 item만 배열에 담는다
    if (id !== 0) {
      // 초기에는 deleteAnswers가 빈 배열이기 때문에 undefined 처리됨
      const copyArr = deleteAnswers ? [...deleteAnswers] : [];
      copyArr.push(id);
      dispatch(setDeleteAnswers([...copyArr]));
    }
  };

  // 정답으로 체크
  const handleClickItem = (num: number) => {
    setCorrect(num);

    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      answer: num.toString(),
    });

    dispatch(setQuestions([...copyArr]));
  };

  return (
    <EditorQuestionChoiceListBox>
      {items.map((item: QuestionItemType, i: number) => {
        return (
          <div key={`item-${i}`}>
            <EditorQuestionChoiceBox isCorrect={correct === i + 1}>
              <EditorChoiceNumBox
                onClick={() => handleClickItem(i + 1)}
                isCorrect={correct === i + 1}
              >
                {i + 1}
              </EditorChoiceNumBox>
              {/* 이미지 형식의 보기라면 이미지 렌더링 */}
              {item.isImage ? (
                <EditorItemImg question={question} curItem={i + 1} />
              ) : (
                <>
                  <input
                    value={item.content}
                    placeholder="보기를 입력하세요"
                    maxLength={200}
                    onChange={(e) => handleChangeItem(i, e)}
                  />
                </>
              )}
              <EditorItemToggleBtn
                isCorrect={correct === i + 1}
                question={question}
                curItem={i + 1}
              />
            </EditorQuestionChoiceBox>
            <AiOutlineMinusCircle onClick={() => handleClickDelete(item.itemId, i)} />
          </div>
        );
      })}
      {!isAnswerValidConfirm && <ClassInputMsg>정답을 선택하세요</ClassInputMsg>}
    </EditorQuestionChoiceListBox>
  );
}

export default EditorQuestionChoiceList;
