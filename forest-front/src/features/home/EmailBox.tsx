import { EmailBoxWrapper, GrayText } from "./EmailBox.style";
import { useRouter } from "next/router";

interface Iprops {
  openModalHandler: (text: string) => void;
}

export default function EmailBox({ openModalHandler }: Iprops) {
  return (
    <EmailBoxWrapper>
      <GrayText className="link" onClick={() => openModalHandler("signup")}>
        이메일 회원가입
      </GrayText>
      <GrayText>|</GrayText>
      <GrayText className="link" onClick={() => openModalHandler("login")}>
        이메일 로그인
      </GrayText>
    </EmailBoxWrapper>
  );
}
