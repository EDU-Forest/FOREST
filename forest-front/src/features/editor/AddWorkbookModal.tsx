import { Title } from "@/styles/text";
import {
  ClassAddModalContainer,
  ClassInputWrapper,
  ClassInput,
  ClassInputBtnWrapper,
} from "../class/teacher/AddClassModal.style";
import { useEffect, useState } from "react";
import SmallBtn from "@/components/Button/SmallBtn";
import React from "react";
import { useDispatch } from "react-redux";
import { closeAddWorkBookModal } from "@/stores/editor/editorModal";
import useAddWorkBook from "@/apis/editor/useAddWorkbookQuery";

export default function AddWorkbookModal() {
  const dispatch = useDispatch();
  const [workbookTitle, setWorkbookTitle] = useState<string>("");
  const { mutate } = useAddWorkBook();

  const addWorkBook = () => {
    mutate(workbookTitle);
    dispatch(closeAddWorkBookModal());
  };

  const onKeyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addWorkBook();
    }
  };

  return (
    <ClassAddModalContainer>
      <Title>추가할 문제집의 이름을 설정해주세요.</Title>
      <ClassInputWrapper>
        <ClassInput
          placeholder={"문제집 이름을 입력하세요"}
          value={workbookTitle}
          onChange={(e) => setWorkbookTitle(e.target.value)}
          maxLength={30}
          onKeyUp={onKeyUpHandler}
          autoFocus
        />
      </ClassInputWrapper>
      <ClassInputBtnWrapper>
        <SmallBtn children="취소" onClick={() => dispatch(closeAddWorkBookModal())} />
        <SmallBtn children="확인" disabled={!workbookTitle} colored onClick={addWorkBook} />
      </ClassInputBtnWrapper>
    </ClassAddModalContainer>
  );
}
