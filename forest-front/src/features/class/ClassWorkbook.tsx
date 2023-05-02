import WorkbookTab from "@/components/Tab/WorkbookTab";
import { ClassWorkbookWrapper } from "./ClassWorkbook.style";
import { useState } from "react";
import ClassWorkbookList from "./ClassWorkbookList";

export default function ClassWorkbook() {
  const [type, setType] = useState<string>("self");
  const [inputs, setInputs] = useState({
    isSelf: true,
    isHomework: false,
    isExam: false,
  });

  const { isSelf, isHomework, isExam } = inputs;

  const changeTab = (type: string) => {
    setType(type);
    switch (type) {
      case "self":
        setInputs({ isSelf: true, isHomework: false, isExam: false });
        break;
      case "homework":
        setInputs({ isSelf: false, isHomework: true, isExam: false });
        break;
      case "exam":
        setInputs({ isSelf: false, isHomework: false, isExam: true });
        break;
      default:
        setInputs({ isSelf: true, isHomework: false, isExam: false });
    }
  };

  return (
    <ClassWorkbookWrapper>
      <WorkbookTab children="자율" selected={isSelf} space={32} onClick={changeTab} type={"self"} />
      <WorkbookTab
        children="과제"
        selected={isHomework}
        space={32}
        onClick={changeTab}
        type={"homework"}
      />
      <WorkbookTab children="시험" selected={isExam} space={32} onClick={changeTab} type={"exam"} />
      <ClassWorkbookList type={type} />
    </ClassWorkbookWrapper>
  );
}
