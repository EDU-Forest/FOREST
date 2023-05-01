import useKakaoLoginQuery from "@/apis/auth/useKakaoLoginQuery";
import { KakaoLoginBtn, KakaoLoginImg, KakaoLoginText } from "./Home.style";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function KakaoLogin() {
  return (
    <KakaoLoginBtn href={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/oauth2/authorization/kakao`}>
      <KakaoLoginImg src={"images/Kakao_Login_Large_Wide.png"} />
      <KakaoLoginText>카카오톡으로 시작하기</KakaoLoginText>
    </KakaoLoginBtn>
  );
}
