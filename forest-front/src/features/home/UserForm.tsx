import Modal from "@/components/Modal/Modal";
import {
  SignupContentBox,
  SignupForm,
  SignupHr,
  SignupInputRowBox,
  SignupLabel,
  SignupRoleBox,
  // SignupInputBox,
  // SignupLabel,
  SignupSubmitBox,
  SignupTitle,
  SignupTitleBox,
} from "./SignupModal.style";
import ArrowLeft from "@/components/Arrow/ArrowLeft";
import SmallBtn from "@/components/Button/SmallBtn";
import { useState } from "react";
import SignupInput from "./SignupInput";
import RoleBtn from "@/components/Button/RoleBtn";
import { checkEmail } from "@/utils";

interface Iprops {
  onClose: () => void;
  type: "signup" | "moreinfo";
  email?: string;
}

export default function UserForm({ onClose, type, email }: Iprops) {
  // 이메일
  const [emailValidation, setEmailValidation] = useState("");
  const [emailDuplicateValidation, setEmailDuplicateValidation] = useState("");

  // 이름
  const [usernameValidation, setUsernameValidation] = useState("");

  // 전화번호
  const [phoneNumberValidation, setPhoneNumberValidation] = useState("");
  const [phoneNumberDuplicateValidation, setPhoneNumberDuplicateValidation] = useState("");

  // 비밀번호
  const [passwordValidation, setPasswordValidation] = useState("");

  // 비밀번호 확인
  const [checkPasswordValidation, setCheckPasswordValidation] = useState("");

  // 생일
  const [birthValidation, setBirthValidation] = useState("");

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    checkPassword: "",
    birth: "",
  });

  const [selectedRole, setSelectedRole] = useState("student");

  const columnDataList = [
    {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "이메일을 입력하세요",
      value: userData.email,
      validations: {
        "이메일 형식": emailValidation,
        중복체크: emailDuplicateValidation,
      },
    },
    {
      label: "이름",
      name: "username",
      type: "text",
      placeholder: "이름을 입력하세요",
      value: userData.username,
      validations: {
        "2자 이상 8자 이하": usernameValidation,
      },
    },
    {
      label: "전화번호",
      name: "phoneNumber",
      type: "number",
      placeholder: "- 없이 숫자만 입력하세요",
      value: userData.phoneNumber,
      validations: {
        "전화번호 형식": phoneNumberValidation,
        중복체크: phoneNumberDuplicateValidation,
      },
    },
  ];

  const rowDataList = [
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      value: userData.password,
      validations: {
        "8자 이상 16자 이하": passwordValidation,
      },
    },
    {
      label: "비밀번호 확인",
      name: "checkPassword",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      value: userData.checkPassword,
      validations: {
        "비밀번호 일치": checkPasswordValidation,
      },
    },
    // {
    //   label: "생년월일",
    //   name: "birth",
    //   type: "date",
    //   placeholder: "생년월일을 선택하세요",
    //   value: userData.birth,
    //   validations: birthValidation,
    // },
  ];

  const signupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return null;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const blurHandler = (e: React.FocusEvent<HTMLElement>) => {
    console.log(e);
    // if (name === "email") {
    //   if (checkEmail(userData.email)) {
    //     setEmailValidation("pass");
    //   } else {
    //     setEmailValidation("fail");
    //   }
    // }
  };

  return (
    <SignupForm onSubmit={signupHandler}>
      <SignupTitleBox>
        <ArrowLeft onClick={onClose}></ArrowLeft>
        <SignupTitle>{type === "signup" ? "회원가입" : "추가 정보 입력"}</SignupTitle>
      </SignupTitleBox>
      <SignupHr />
      <SignupContentBox>
        {columnDataList.map((data) => (
          <SignupInput
            email={email}
            formType={type}
            label={data.label}
            name={data.name}
            type={data.type}
            placeholder={data.placeholder}
            value={data.value}
            onChange={onChange}
            validations={data.validations}
            onBlur={blurHandler}
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
              onBlur={blurHandler}
            />
          ))}
        </SignupInputRowBox>
        <SignupInput
          isShort={true}
          label="생년월일"
          name="birth"
          type="date"
          placeholder="생년월일을 입력하세요"
          value={userData.birth}
          onChange={onChange}
          validations={{ "생년월일 선택": birthValidation }}
          onBlur={blurHandler}
        />
      </SignupContentBox>
      <SignupRoleBox>
        <SignupLabel>역할</SignupLabel>
        <RoleBtn role="teacher" setSelectedRole={setSelectedRole} selectedRole={selectedRole} />
        <RoleBtn role="student" setSelectedRole={setSelectedRole} selectedRole={selectedRole} />
      </SignupRoleBox>
      <SignupHr />
      <SignupSubmitBox>
        <SmallBtn colored>확인</SmallBtn>
      </SignupSubmitBox>
    </SignupForm>
  );
}
