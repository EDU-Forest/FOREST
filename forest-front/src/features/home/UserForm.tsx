import {
  SignupContentBox,
  SignupForm,
  SignupHr,
  SignupInputBox,
  SignupLabel,
  SignupPasswordBox,
  SignupRoleBox,
  // SignupInputBox,
  // SignupLabel,
  SignupSubmitBox,
  SignupTitle,
  SignupTitleBox,
} from "./SignupModal.style";
import ArrowLeft from "@/components/Arrow/ArrowLeft";
import SmallBtn from "@/components/Button/SmallBtn";
import { useEffect, useState } from "react";
import RoleBtn from "@/components/Button/RoleBtn";
import { checkEmail } from "@/utils";
import { CommonInput } from "@/components/Input/Input.style";
import { SignupLabelBox } from "./Home.style";
import Label from "@/components/Label/Label";
import { useRouter } from "next/router";
import useKakaoLoginMoreInfo from "@/apis/auth/useKakaoLoginMoreInfoQuery";
import { useDispatch } from "react-redux";
import { setRole, setUsername } from "@/stores/user/user";

interface Iprops {
  onClose: () => void;
  type: "signup" | "moreinfo";
}

export default function UserForm({ type }: Iprops) {
  const { mutate } = useKakaoLoginMoreInfo();
  const router = useRouter();
  const dispatch = useDispatch();
  const [validation, setValidation] = useState({
    email: "",
    emailDuplicate: "",
    username: "",
    phoneNumber: "",
    phoneNumberDuplicate: "",
    password: "",
    passwordForm: "",
    checkPassword: "",
    birth: "",
  });
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    checkPassword: "",
    role: "STUDENT",
    birth: "",
  });

  useEffect(() => {
    if (type === "moreinfo") {
      setValidation({
        ...validation,
        email: "pass",
        emailDuplicate: "pass",
      });
    }

    const email = router.query?.email;
    if (typeof email === "string") {
      setUserData({
        ...userData,
        email: email,
      });
    }
  }, []);

  const movePage = () => {
    router.push("/");
  };

  const signupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setUsername(userData.username));
    dispatch(setRole(userData.role));
    if (
      (type === "moreinfo" || validation.email === "pass") &&
      validation.username === "pass" &&
      validation.phoneNumber === "pass" &&
      validation.birth === "pass"
    ) {
      mutate(userData);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === "birth") {
      birthValidator();
    }
  };

  const emailValidator = () => {
    setValidation({
      ...validation,
      email: checkEmail(userData.email.trim()) ? "pass" : "fail",
    });
  };

  const usernameValidator = () => {
    const lengthOfUsername = userData.username.trim().length;
    setValidation({
      ...validation,
      username: lengthOfUsername >= 2 && lengthOfUsername <= 8 ? "pass" : "fail",
    });
  };

  const phoneNumberValidator = () => {
    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    setValidation({
      ...validation,
      phoneNumber: regPhone.test(userData.phoneNumber.trim()) ? "pass" : "fail",
    });
  };

  const passwordValidator = () => {
    const lengthOfPassword = userData.password.trim().length;
    const checkNumber = userData.password.search(/[0-9]/g);
    const checkEnglish = userData.password.search(/[a-z]/gi);

    setValidation({
      ...validation,
      password: lengthOfPassword >= 8 && lengthOfPassword <= 16 ? "pass" : "fail",
      passwordForm: checkNumber >= 0 && checkEnglish >= 0 ? "pass" : "fail",
    });
  };

  const checkPasswordValidator = () => {
    setValidation({
      ...validation,
      checkPassword:
        userData.password && userData.password === userData.checkPassword ? "pass" : "fail",
    });
  };

  const birthValidator = () => {
    setValidation({
      ...validation,
      birth: "pass",
    });
  };

  return (
    <SignupForm onSubmit={signupHandler}>
      <SignupTitleBox>
        <ArrowLeft onClick={movePage}></ArrowLeft>
        <SignupTitle>{type === "signup" ? "회원가입" : "추가 정보 입력"}</SignupTitle>
      </SignupTitleBox>
      <SignupHr />
      <SignupContentBox>
        <SignupInputBox>
          <SignupLabel htmlFor="email">이메일</SignupLabel>
          <CommonInput
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={userData.email}
            onChange={onChange}
            disabled={type === "moreinfo"}
            onBlur={emailValidator}
          />
          <SignupLabelBox>
            <Label status={validation.email}>이메일 형식</Label>
            <Label status={validation.emailDuplicate}>중복체크</Label>
          </SignupLabelBox>
        </SignupInputBox>
        <SignupInputBox>
          <SignupLabel htmlFor="username">이름</SignupLabel>
          <CommonInput
            id="username"
            name="username"
            isShort={true}
            placeholder="이름을 입력하세요"
            value={userData.username}
            onChange={onChange}
            onBlur={usernameValidator}
            autoComplete="username"
          />
          <SignupLabelBox>
            <Label status={validation.username}>2자 이상 8자 이하</Label>
          </SignupLabelBox>
        </SignupInputBox>
        <SignupInputBox>
          <SignupLabel htmlFor="phoneNumber">전화번호</SignupLabel>
          <CommonInput
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            placeholder="- 없이 숫자만 입력하세요"
            value={userData.phoneNumber}
            onChange={onChange}
            onBlur={phoneNumberValidator}
          />
          <SignupLabelBox>
            <Label status={validation.phoneNumber}>전화번호 형식</Label>
            <Label status={validation.phoneNumberDuplicate}>중복체크</Label>
          </SignupLabelBox>
        </SignupInputBox>
        {type === "signup" && (
          <SignupPasswordBox>
            <SignupInputBox>
              <SignupLabel htmlFor="password">비밀번호</SignupLabel>
              <CommonInput
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                isShort={true}
                value={userData.password}
                onChange={onChange}
                onBlur={passwordValidator}
                autoComplete="new-password"
              />
              <SignupLabelBox>
                <Label status={validation.password}>8자 이상 16자 이하</Label>
                <Label status={validation.passwordForm}>영문 숫자 모두 사용</Label>
              </SignupLabelBox>
            </SignupInputBox>
            <SignupInputBox>
              <SignupLabel htmlFor="checkPassword">비밀번호 확인</SignupLabel>
              <CommonInput
                id="checkPassword"
                name="checkPassword"
                type="password"
                isShort={true}
                placeholder="비밀번호를 입력하세요"
                value={userData.checkPassword}
                onChange={onChange}
                onBlur={checkPasswordValidator}
                autoComplete="new-check-password"
              />
              <SignupLabelBox>
                <Label status={validation.checkPassword}>비밀번호 일치</Label>
              </SignupLabelBox>
            </SignupInputBox>
          </SignupPasswordBox>
        )}
        <SignupInputBox>
          <SignupLabel htmlFor="birth">생년월일</SignupLabel>
          <CommonInput
            id="birth"
            name="birth"
            type="date"
            isShort={true}
            placeholder="생년월일을 선택하세요"
            value={userData.birth}
            onChange={onChange}
          />
          <SignupLabelBox>
            <Label status={validation.birth}>생년월일 선택</Label>
          </SignupLabelBox>
        </SignupInputBox>
      </SignupContentBox>
      <SignupRoleBox>
        <SignupLabel>역할</SignupLabel>
        <RoleBtn role="TEACHER" setUserData={setUserData} userData={userData} />
        <RoleBtn role="STUDENT" setUserData={setUserData} userData={userData} />
      </SignupRoleBox>
      <SignupHr />
      <SignupSubmitBox>
        <SmallBtn colored>확인</SmallBtn>
      </SignupSubmitBox>
    </SignupForm>
  );
}
