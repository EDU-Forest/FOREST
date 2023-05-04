import { Title } from "@/styles/text";
import {
  ClassAddModalContainer,
  ClassInputCheck,
  ClassInputWrapper,
  ClassInput,
  ClassInputMsg,
  ClassInputBtnWrapper,
} from "../class/teacher/AddClassModal.style";
import { useEffect, useState } from "react";
import SmallBtn from "@/components/Button/SmallBtn";
import React from "react";
import { useDispatch } from "react-redux";
import { closeAddClassModal } from "@/stores/class/classModal";
import useCheckClassNameQuery from "@/apis/class/teacher/useCheckClassNameQuery";
import useClassAdd from "@/apis/class/teacher/useClassAdd";

export default function AddWorkbookModal() {
  const dispatch = useDispatch();
  const [workbookTitle, setWorkbookTitle] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  };

  return (
    <ClassAddModalContainer>
      <Title>추가할 문제집의 이름을 설정해주세요.</Title>
      <ClassInputWrapper>
        <ClassInput
          placeholder={"문제집 이름을 입력하세요"}
          value={workbookTitle}
          onChange={(e) => setWorkbookTitle(e.target.value)}
          maxLength={14}
        />
      </ClassInputWrapper>
      <ClassInputBtnWrapper>
        <SmallBtn children="취소" onClick={() => dispatch(closeAddClassModal())} />
        <SmallBtn children="확인" disabled={!workbookTitle} colored onClick={confirm} />
      </ClassInputBtnWrapper>
    </ClassAddModalContainer>
  );
}
