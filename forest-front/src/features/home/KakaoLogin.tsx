import { useRouter } from "next/router";
import { KakaoLoginBtn, KakaoLoginImg, KakaoLoginText } from "./Home.style";

export default function KakaoLogin() {
  const router = useRouter();

  const goToDash = () => {
    router.push("/teacher/dashboard");
  };
  return (
    <KakaoLoginBtn>
      <KakaoLoginImg src={"images/Kakao_Login_Large_Wide.png"} />
      <KakaoLoginText onClick={goToDash}>카카오톡으로 시작하기</KakaoLoginText>
    </KakaoLoginBtn>
  );
}
