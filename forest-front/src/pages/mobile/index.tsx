import Lottie from "react-lottie-player";
import sorryFolksJson from "../../../public/lottieJson/sorryFolks.json";
import { CSSProperties, useEffect } from "react";
import { MobileBox, MobileLayout } from "../../features/mobile/Mobile.style";
import { useRouter } from "next/router";

export default function Mobile() {
  const router = useRouter();

  const sorryFolksStyle: CSSProperties = {
    width: "50%",
    height: "50%",
  };

  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth >= 768) {
      router.push("/", undefined, { shallow: true });
    }
  }, []);

  return (
    <MobileLayout>
      <img src={"/images/Forest_Logo.png"} />
      <MobileBox>
        <Lottie loop animationData={sorryFolksJson} play style={sorryFolksStyle} />
        <p>모바일 버전은 추후 업데이트할 예정입니다.</p>
        <p>불편함을 드려 죄송합니다.</p>
      </MobileBox>
    </MobileLayout>
  );
}
