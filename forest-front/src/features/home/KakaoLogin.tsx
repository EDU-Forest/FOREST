import useKakaoLoginQuery from "@/apis/auth/useKakaoLoginQuery";
import { KakaoLoginBtn, KakaoLoginImg, KakaoLoginText } from "./Home.style";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function KakaoLogin() {
  const [isClicked, setIsClicked] = useState(false);
  useKakaoLoginQuery(isClicked);
  const handleKakaoLogin = () => {
    setIsClicked(!isClicked);
  };
  return (
    <KakaoLoginBtn onClick={handleKakaoLogin}>
      <KakaoLoginImg src={"images/Kakao_Login_Large_Wide.png"} />
      <KakaoLoginText>카카오톡으로 시작하기</KakaoLoginText>
    </KakaoLoginBtn>
  );
}
