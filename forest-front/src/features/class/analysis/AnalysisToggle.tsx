import { useState } from "react";
import { ToggleCircle, ToggleContainer, ToggleText, ToggleWrapper } from "./AnalysisToggle.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { WarningIcon } from "../ClassSummary.style";
import { IoWarningOutline } from "react-icons/io5";

interface Iprops {
  isSummary: boolean;
  setToggle: (check: boolean) => void;
  isDescript: boolean;
}

export default function AnalysisToggle({ isSummary, setToggle, isDescript }: Iprops) {
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
          {isDescript && (
            <WarningIcon>
              <IoWarningOutline />
            </WarningIcon>
          )}
        </ToggleText>
      </ToggleContainer>
      <ToggleCircle isSummary={isSummary} />
    </ToggleWrapper>
  );
}
