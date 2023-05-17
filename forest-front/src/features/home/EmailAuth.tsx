import { EmailAuthBox } from "./Home.style";

interface Iprops {
  handleModal: (text: string) => void;
}

export default function EmailAuth({ handleModal }: Iprops) {
  return (
    <EmailAuthBox>
      <p className="link" onClick={() => handleModal("signup")}>
        이메일 회원가입
      </p>
      <p>|</p>
      <p className="link" onClick={() => handleModal("login")}>
        이메일 로그인
      </p>
    </EmailAuthBox>
  );
}
