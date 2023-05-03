import { setDeleteAnswers, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionItemType, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
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
  const [corret, setCorret] = useState(0);

  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);
  const { deleteAnswers } = useSelector((state: RootState) => state.editQuestions);

  useEffect(() => {
    setCorret(Number(question.answer));
  }, [question]);

  const handleChangeItem = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const copyArr = [...items];
    copyArr.splice(i, 1, { ...copyArr[i], content: e.target.value });
    setItems([...copyArr]);

    itemChange([...copyArr]);
  };

  const handleClickDelete = (id: number, i: number) => {
    console.log(deleteAnswers);
    setItems(items.filter((item, idx) => idx !== i));

    itemChange(items.filter((item, idx) => idx !== i));

    const copyArr = [...deleteAnswers];
    copyArr.push(id);
    dispatch(setDeleteAnswers(copyArr));
  };

  // 정답으로 체크
  const handleClickItem = (num: number) => {
    setCorret(num);

    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      answer: num.toString(),
    });

    dispatch(setQuestions([...copyArr]));
  };

  return (
    <EditorQuestionChoiceListBox>
      {items.map((item, i) => {
        return (
          <div>
            <EditorQuestionChoiceBox isCorrect={corret === i + 1}>
              <EditorChoiceNumBox
                onClick={() => handleClickItem(i + 1)}
                isCorrect={corret === i + 1}
              >
                {i + 1}
              </EditorChoiceNumBox>
              {/* 이미지 형식의 보기라면 이미지 렌더링 */}
              {item.isImage ? (
                <>
                  <img src={item.content} alt="item" />
                  <button>이미지 삽입</button>
                </>
              ) : (
                <>
                  <input
                    value={item.content}
                    placeholder="보기를 입력하세요"
                    onChange={(e) => handleChangeItem(i, e)}
                  />
                </>
              )}
              <EditorItemToggleBtn isCorrect={corret === i + 1} question={question} curItem={i + 1} />
            </EditorQuestionChoiceBox>
            <AiOutlineMinusCircle onClick={() => handleClickDelete(item.id, i)} />
          </div>
        );
      })}
    </EditorQuestionChoiceListBox>
  );
}

export default EditorQuestionChoiceList;
