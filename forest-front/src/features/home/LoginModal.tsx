import ArrowLeft from "@/components/Arrow/ArrowLeft";
import {
  LoginForm,
  LoginContentBox,
  LoginHr,
  LoginTitle,
  LoginTitleBox,
  LoginSubmitBox,
  LoginLabel,
  LoginInputBox,
  LoginErrorMsg,
} from "./Home.style";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { CommonInput } from "@/components/Input/Input.style";
import { checkEmail } from "@/utils";
import SmallBtn from "@/components/Button/SmallBtn";

interface Iprops {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Iprops) {
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  // 서버 응답에 대한 에러 메세지
  // const [validErrorMsg, setValidErrorMsg] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email) {
      setEmailErrorMsg("이메일은 필수 입력 사항입니다.");
      return;
    } else if (!checkEmail(userData.email)) {
      setEmailErrorMsg("잘못된 이메일 형식입니다.");
      return;
    } else {
      setEmailErrorMsg("");
    }

    if (!userData.password) {
      setPasswordErrorMsg("비밀번호는 필수 입력 사항입니다.");
      return;
    }

    setEmailErrorMsg("");
    setPasswordErrorMsg("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <Modal onClose={onClose}>
      <LoginForm onSubmit={loginHandler}>
        <LoginTitleBox>
          <ArrowLeft onClick={onClose}></ArrowLeft>
          <LoginTitle>로그인</LoginTitle>
        </LoginTitleBox>
        <LoginHr />
        <LoginContentBox>
          <LoginInputBox>
            <LoginLabel htmlFor="email">이메일</LoginLabel>
            <CommonInput
              id="email"
              name="email"
              placeholder="이메일를 입력하세요"
              value={email}
              onChange={onChange}
            />
            {emailErrorMsg && <LoginErrorMsg>{emailErrorMsg}</LoginErrorMsg>}
          </LoginInputBox>
          <LoginInputBox>
            <LoginLabel htmlFor="password">비밀번호</LoginLabel>
            <CommonInput
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={onChange}
            />
            {passwordErrorMsg && <LoginErrorMsg>{passwordErrorMsg}</LoginErrorMsg>}
          </LoginInputBox>
        </LoginContentBox>
        <LoginHr />
        <LoginSubmitBox>
          <SmallBtn colored>확인</SmallBtn>
        </LoginSubmitBox>
      </LoginForm>
      {/* <ul onClick={props.onClose}>
        {menus.map((menuObj) => (
          <li key={menuObj.menu}>
            <Link href={menuObj.url}>{menuObj.menu}</Link>
          </li>
        ))}
      </ul> */}
    </Modal>
  );
}
