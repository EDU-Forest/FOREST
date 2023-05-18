import { useRouter } from "next/router";
import { BsQuestionCircle } from "react-icons/bs";
import { GuideIconWrapper } from "./Guide.style";

export default function GuideIcon() {
  const router = useRouter();
  const goToGuide = () => {
    router.push("/guide", undefined, { shallow: true });
  };

  return (
    <GuideIconWrapper>
      <div className="hover-text">사용가이드</div>
      <BsQuestionCircle onClick={goToGuide} />
    </GuideIconWrapper>
  );
}
