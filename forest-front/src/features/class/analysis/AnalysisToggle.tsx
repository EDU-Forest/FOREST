import { useState } from "react";
import { ToggleCircle, ToggleContainer, ToggleText, ToggleWrapper } from "./AnalysisToggle.style";

interface Iprops {
  isSummary: boolean;
  setToggle: (check: boolean) => void;
}

export default function AnalysisToggle({ isSummary, setToggle }: Iprops) {
  const changeTab = (check: boolean) => {
    setToggle(check);
  };

  return (
    <ToggleWrapper>
      <ToggleContainer isSummary={isSummary}>
        <ToggleText onClick={() => changeTab(true)} selected={isSummary}>
          요약
        </ToggleText>
        <ToggleText onClick={() => changeTab(false)} selected={!isSummary}>
          서술형 채점
        </ToggleText>
      </ToggleContainer>
      <ToggleCircle isSummary={isSummary} />
    </ToggleWrapper>
  );
}
