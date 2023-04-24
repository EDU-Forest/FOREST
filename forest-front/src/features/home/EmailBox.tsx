import { EmailBoxWrapper, GrayText } from "./EmailBox.style";
import { useRouter } from "next/router";

export default function EmailBox() {
  const router = useRouter();
  return (
    <EmailBoxWrapper>
      <GrayText className="link" onClick={() => router.push("/signup")}>
        이메일 회원가입
      </GrayText>
      <GrayText>|</GrayText>
      <GrayText className="link" onClick={() => router.push("/login")}>
        이메일 로그인
      </GrayText>
    </EmailBoxWrapper>
  );
}
