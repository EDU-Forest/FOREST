import { Title } from "@/styles/text";
import {
  ClassAddModalContainer,
  ClassInputCheck,
  ClassInputWrapper,
  ClassInput,
  ClassInputMsg,
  ClassInputBtnWrapper,
} from "./AddClassModal.style";
import { useEffect, useState } from "react";
import SmallBtn from "@/components/Button/SmallBtn";
import React from "react";
import { useDispatch } from "react-redux";
import { closeAddClassModal } from "@/stores/class/classModal";
import useCheckClassNameQuery from "@/apis/auth/class/teacher/useCheckClassNameQuery";

export default function AddClassModal() {
  const dispatch = useDispatch();
  const [className, setClassName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  // isSuccess -> axios 요청 성공 여부

  useCheckClassNameQuery({ className, setErrorMsg });

  const confirm = () => {
    // 확인
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
        />
        <ClassInputCheck isSuccess />
        <ClassInputMsg>{errorMsg}</ClassInputMsg>
      </ClassInputWrapper>
      <ClassInputBtnWrapper>
        <SmallBtn children="취소" onClick={() => dispatch(closeAddClassModal())} />
        {/* disabled에 변수 매핑해주기 + classinputcheck */}
        <SmallBtn children="확인" disabled colored onClick={confirm} />
      </ClassInputBtnWrapper>
    </ClassAddModalContainer>
  );
}
