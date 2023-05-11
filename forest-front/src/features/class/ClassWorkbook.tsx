import WorkbookTab from "@/components/Tab/WorkbookTab";
import { ClassWorkbookWrapper } from "./ClassWorkbook.style";
import { useState } from "react";
import ClassWorkbookList from "./ClassWorkbookList";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setStudyType } from "@/stores/class/classInfo";

export default function ClassWorkbook() {
  const dispatch = useDispatch();
  const { nowStudyType } = useSelector((state: RootState) => state.class);

  const clickHandler = (type: string) => {
    dispatch(setStudyType(type));
  };

  return (
    <ClassWorkbookWrapper>
      <WorkbookTab
        children="시험"
        selected={nowStudyType === "exam" ? true : false}
        space={32}
        onClick={() => clickHandler("exam")}
        type={"exam"}
      />
      <WorkbookTab
        children="과제"
        selected={nowStudyType === "homework" ? true : false}
        space={32}
        onClick={() => clickHandler("homework")}
        type={"homework"}
      />
      <WorkbookTab
        children="자습"
        selected={nowStudyType === "self" ? true : false}
        space={32}
        onClick={() => clickHandler("self")}
        type={"self"}
      />
      <ClassWorkbookList />
    </ClassWorkbookWrapper>
  );
}
