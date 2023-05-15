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
  LoginLabelBox,
} from "./Home.style";
import { useEffect, useState } from "react";
import { CommonInput } from "@/components/Input/Input.style";
import { checkEmail } from "@/utils";
import SmallBtn from "@/components/Button/SmallBtn";
import { useRouter } from "next/router";
import useLogin from "@/apis/auth/useLoginQuery";
import Label from "@/components/Label/Label";
import Toast from "@/components/Toast/Toast";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Iprops {
  setIsError: (isError: boolean) => void;
}

export default function Login({ setIsError }: Iprops) {
  const router = useRouter();
  const { mutate } = useLogin(setIsError);
  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });

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

    loginValidator();
    mutate(userData);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const emailValidator = () => {
    setValidation({
      ...validation,
      email: checkEmail(userData.email.trim()) ? "pass" : "fail",
    });
  };

  const passwordValidator = () => {
    setValidation({
      ...validation,
      password: userData.password.trim() ? "pass" : "fail",
    });
  };

  const loginValidator = () => {
    if (!checkEmail(userData.email.trim())) {
      setValidation({
        ...validation,
        email: "fail",
      });
      return;
    }

    if (!userData.password.trim()) {
      setValidation({
        ...validation,
        password: "fail",
      });
      return;
    }

    setValidation({
      email: "pass",
      password: "pass",
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
            onBlur={emailValidator}
            autoComplete="email"
            autoFocus
          />
          {/* {emailErrorMsg && <LoginErrorMsg>{emailErrorMsg}</LoginErrorMsg>} */}
          <LoginLabelBox>
            <Label status={validation.email}>이메일 형식</Label>
          </LoginLabelBox>
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
            onBlur={passwordValidator}
            autoComplete="current-password"
          />
          {/* {passwordErrorMsg && <LoginErrorMsg>{passwordErrorMsg}</LoginErrorMsg>} */}
          {/* <LoginErrorMsg>{passwordErrorMsg ? passwordErrorMsg : ""}</LoginErrorMsg> */}
          <LoginLabelBox>
            <Label status={validation.password}>비밀번호 입력</Label>
          </LoginLabelBox>
        </LoginInputBox>
      </LoginContentBox>
      <LoginHr />
      <LoginSubmitBox>
        <SmallBtn colored>확인</SmallBtn>
      </LoginSubmitBox>
    </LoginForm>
  );
}
