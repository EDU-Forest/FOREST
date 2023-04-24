import { KakaoLoginBtn, KakaoLoginImg, KakaoLoginText } from "./KakaoLogin.style";

export default function KakaoLogin() {
  return (
    <KakaoLoginBtn>
      <KakaoLoginImg src={"images/Kakao_Login_Large_Wide.png"} />
      <KakaoLoginText>카카오톡으로 시작하기</KakaoLoginText>
    </KakaoLoginBtn>
  );
}
