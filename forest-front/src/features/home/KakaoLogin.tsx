import useKakaoLoginQuery from "@/apis/auth/useKakaoLoginQuery";
import { KakaoLoginBtn, KakaoLoginImg, KakaoLoginText } from "./Home.style";
import { useDispatch } from "react-redux";

export default function KakaoLogin() {
  const { refetch } = useKakaoLoginQuery();
  const handleKakaoLogin = () => {
    refetch();
  };
  return (
    <KakaoLoginBtn onClick={handleKakaoLogin}>
      <KakaoLoginImg src={"images/Kakao_Login_Large_Wide.png"} />
      <KakaoLoginText>카카오톡으로 시작하기</KakaoLoginText>
    </KakaoLoginBtn>
  );
}
