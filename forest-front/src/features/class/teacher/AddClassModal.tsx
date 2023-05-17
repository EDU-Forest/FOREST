import { Title } from "@/styles/text";
import {
  ClassAddModalContainer,
  ClassInputCheck,
  ClassInputWrapper,
  ClassInput,
  ClassInputMsg,
  ClassInputBtnWrapper,
} from "./AddClassModal.style";
import React, { useEffect, useState } from "react";
import SmallBtn from "@/components/Button/SmallBtn";
import { useDispatch } from "react-redux";
import { closeAddClassModal } from "@/stores/class/classModal";
import useCheckClassNameQuery from "@/apis/class/teacher/useCheckClassNameQuery";
import useClassAdd from "@/apis/class/teacher/useClassAdd";

export default function AddClassModal() {
  const dispatch = useDispatch();
  const [className, setClassName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const { mutate } = useClassAdd();

  useCheckClassNameQuery({ className, setErrorMsg, setIsAvailable });

  useEffect(() => {
    if (className.length < 1) {
      setIsAvailable(false);
    }
  }, [className]);

  const onKeyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      confirm();
    }
  };

  const confirm = () => {
    mutate(className);
  };

  return (
    <ClassAddModalContainer>
      <Title>추가할 클래스의 이름을 설정해주세요.</Title>
      <ClassInputWrapper>
        <ClassInput
          placeholder={"클래스명을 입력하세요"}
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          maxLength={14}
          onKeyUp={onKeyUpHandler}
          autoFocus
        />
        <ClassInputCheck isSuccess={isAvailable} />
        <ClassInputMsg>{errorMsg}</ClassInputMsg>
      </ClassInputWrapper>
      <ClassInputBtnWrapper>
        <SmallBtn children="취소" onClick={() => dispatch(closeAddClassModal())} />
        <SmallBtn children="확인" disabled={!isAvailable} colored onClick={confirm} />
      </ClassInputBtnWrapper>
    </ClassAddModalContainer>
  );
}
