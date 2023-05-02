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
import { useState } from "react";
import { CommonInput } from "@/components/Input/Input.style";
import { checkEmail } from "@/utils";
import SmallBtn from "@/components/Button/SmallBtn";
import { useRouter } from "next/router";
import useLogin from "@/apis/auth/useLoginQuery";

export default function Login() {
  const router = useRouter();
  const { mutate } = useLogin();
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  // 서버 응답에 대한 에러 메세지
  // const [validErrorMsg, setValidErrorMsg] = useState("");
  const [userData, setUserData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const movePage = () => {
    router.push("/");
  };

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
    mutate(userData);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <LoginForm onSubmit={loginHandler}>
      <LoginTitleBox>
        <ArrowLeft onClick={movePage}></ArrowLeft>
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
            autoComplete="email"
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
            autoComplete="current-password"
          />
          {passwordErrorMsg && <LoginErrorMsg>{passwordErrorMsg}</LoginErrorMsg>}
        </LoginInputBox>
      </LoginContentBox>
      {loginErrorMsg && <LoginErrorMsg>{loginErrorMsg}</LoginErrorMsg>}
      <LoginHr />
      <LoginSubmitBox>
        <SmallBtn colored>확인</SmallBtn>
      </LoginSubmitBox>
    </LoginForm>
  );
}
