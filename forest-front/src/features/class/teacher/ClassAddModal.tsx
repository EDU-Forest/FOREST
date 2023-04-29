import { Title } from "@/styles/text";
import {
  ClassAddModalContainer,
  ClassInputCheck,
  ClassInputWrapper,
  ClassInput,
  ClassInputMsg,
  ClassInputBtnWrapper,
} from "./ClassAddModal.style";
import { useState } from "react";
import SmallBtn from "@/components/Button/SmallBtn";

interface Iprops {
  handleModal: () => void;
}

export default function ClassAddModal({ handleModal }: Iprops) {
  const [className, setClassName] = useState<string>("");
  // isSuccess -> axios 요청 성공 여부

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
        <ClassInputMsg>이미 존재하는 클래스 이름입니다. </ClassInputMsg>
      </ClassInputWrapper>
      <ClassInputBtnWrapper>
        <SmallBtn children="확인" colored onClick={confirm} />
        <SmallBtn children="취소" onClick={handleModal} />
      </ClassInputBtnWrapper>
    </ClassAddModalContainer>
  );
}
