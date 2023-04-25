import Modal from "@/components/Modal/Modal";
import {
  SignupContentBox,
  SignupForm,
  SignupHr,
  SignupInputRowBox,
  // SignupInputBox,
  // SignupLabel,
  SignupSubmitBox,
  SignupTitle,
  SignupTitleBox,
} from "./SignupModal.style";
import ArrowLeft from "@/components/Arrow/ArrowLeft";
import { CommonInput } from "@/components/Input/Input.style";
import SmallBtn from "@/components/Button/SmallBtn";
import { useState } from "react";
import SignupInput from "./SignupInput";

interface Iprops {
  onClose: () => void;
}

export default function SignupModal({ onClose }: Iprops) {
  const [emailValidation, setEmailValidation] = useState({
    "이메일 형식": "",
    중복체크: "",
  });
  const [usernameValidation, setUsernameValidation] = useState({
    "N자 이상 N자 이하": "",
  });
  const [phoneNumberValidation, setPhoneNumberValidation] = useState({
    "전화번호 형식": "",
    중복체크: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    "N자 이상 N자 이하": "",
    "특정 형식 포함": "",
  });
  const [checkPasswordValidation, setCheckPasswordValidation] = useState({
    "비밀번호 일치": "",
  });
  const [birthValidation, setBirthValidation] = useState({
    "생년월일 선택": "",
  });

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    checkPassword: "",
    birth: "",
    role: "student",
  });

  const columnDataList = [
    {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "이메일을 입력하세요",
      value: userData.email,
      validations: emailValidation,
    },
    {
      label: "이름",
      name: "name",
      type: "text",
      placeholder: "이름을 입력하세요",
      value: userData.username,
      validations: usernameValidation,
    },
    {
      label: "전화번호",
      name: "phoneNumber",
      type: "text",
      placeholder: "- 없이 숫자만 입력하세요",
      value: userData.phoneNumber,
      validations: emailValidation,
    },
    // {
    //   label: "비밀번호",
    //   name: "password",
    //   type: "password",
    //   placeholder: "비밀번호를 입력하세요",
    //   value: userData.password,
    //   validations: passwordValidation,
    // },
    // {
    //   label: "비밀번호 확인",
    //   name: "checkPassword",
    //   type: "password",
    //   placeholder: "비밀번호를 입력하세요",
    //   value: userData.checkPassword,
    //   validations: checkPasswordValidation,
    // },
    // {
    //   label: "생년월일",
    //   name: "birth",
    //   type: "date",
    //   placeholder: "생년월일을 선택하세요",
    //   value: userData.birth,
    //   validations: birthValidation,
    // },
  ];

  const rowDataList = [
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      value: userData.password,
      validations: passwordValidation,
    },
    {
      label: "비밀번호 확인",
      name: "checkPassword",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      value: userData.checkPassword,
      validations: checkPasswordValidation,
    },
    {
      label: "생년월일",
      name: "birth",
      type: "date",
      placeholder: "생년월일을 선택하세요",
      value: userData.birth,
      validations: birthValidation,
    },
  ];

  const signupHandler = () => {
    return null;
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
      <SignupForm onSubmit={signupHandler}>
        <SignupTitleBox>
          <ArrowLeft onClick={onClose}></ArrowLeft>
          <SignupTitle>회원가입</SignupTitle>
        </SignupTitleBox>
        <SignupHr />
        <SignupContentBox>
          {columnDataList.map((data) => (
            <SignupInput
              label={data.label}
              name={data.name}
              type={data.type}
              placeholder={data.placeholder}
              value={data.value}
              onChange={onChange}
              validations={data.validations}
            />
          ))}
          <SignupInputRowBox>
            {rowDataList.map((data) => (
              <SignupInput
                isShort={true}
                label={data.label}
                name={data.name}
                type={data.type}
                placeholder={data.placeholder}
                value={data.value}
                onChange={onChange}
                validations={data.validations}
              />
            ))}
          </SignupInputRowBox>
          {/* <SignupInput
            label="생년월일"
            name="birth"
            type="date"
            placeholder="생년월일을 입력하세요"
            value={userData.birth}
            onChange={onChange}
            validations={birthValidation}
          /> */}
        </SignupContentBox>
        <SignupHr />
        <SignupSubmitBox>
          <SmallBtn colored>확인</SmallBtn>
        </SignupSubmitBox>
      </SignupForm>
    </Modal>
  );
}
