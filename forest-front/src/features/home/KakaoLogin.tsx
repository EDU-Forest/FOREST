import { KakaoLoginBtn, KakaoLoginImg, KakaoLoginText } from "./Home.style";

export default function KakaoLogin() {
  return (
    <KakaoLoginBtn
      href={`${process.env.NEXT_PUBLIC_SERVER_URL}:9010/api/oauth2/authorization/kakao`}
    >
      <KakaoLoginImg src={"images/Kakao_Login_Large_Wide.png"} />
      <KakaoLoginText>카카오톡으로 시작하기</KakaoLoginText>
    </KakaoLoginBtn>
  );
}
