import { useRouter } from "next/router";
import {
  GuideNavItem,
  GuideNavItemContainer,
  GuideNavSubItem,
  GuideNavWrapper,
} from "./GuideNav.style";
import ArrowLeft from "@/components/Arrow/ArrowLeft";
import { ArrowDiv } from "@/components/Nav/Nav.style";

interface Iprops {
  guideTab: string;
  setGuideTab: (tab: string) => void;
}
export default function GuideNav({ guideTab, setGuideTab }: Iprops) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const selectTab = (name: string) => {
    if (guideTab === name) return true;
    else return false;
  };

  const clickHandler = (name: string) => {
    setGuideTab(name);
  };

  return (
    <GuideNavWrapper>
      <ArrowDiv>
        <ArrowLeft onClick={goBack} />
      </ArrowDiv>
      <GuideNavItemContainer>
        <GuideNavItem selected={selectTab("intro")} onClick={() => clickHandler("intro")}>
          포레스트 소개
        </GuideNavItem>
        <GuideNavItem selected={selectTab("role")} onClick={() => clickHandler("role")}>
          역할
        </GuideNavItem>
        <GuideNavItem selected={selectTab("dashboard")} onClick={() => clickHandler("dashboard")}>
          대시보드
        </GuideNavItem>
        <GuideNavItem selected={selectTab("class")} onClick={() => clickHandler("class")}>
          클래스
        </GuideNavItem>
        <GuideNavItem selected={selectTab("problem")} onClick={() => clickHandler("problem")}>
          문제
        </GuideNavItem>
        <GuideNavItem selected={selectTab("editor")} onClick={() => clickHandler("editor")}>
          에디터
        </GuideNavItem>
        <GuideNavItem selected={selectTab("search")} onClick={() => clickHandler("search")}>
          탐색
        </GuideNavItem>
      </GuideNavItemContainer>
    </GuideNavWrapper>
  );
}
