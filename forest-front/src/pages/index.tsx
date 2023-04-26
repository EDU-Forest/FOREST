import ExportBtn from "@/components/Button/ExportBtn";
import ProblemResultBtn from "@/components/Button/ProblemResultBtn";
import RoleBtn from "@/components/Button/RoleBtn";
import ClassInfoCard from "@/components/Card/ClassInfoCard";
import StudentInfoCard from "@/components/Card/StudentInfoCard";
import HashTag from "@/components/HashTag/HashTag";
import CommonInput from "@/components/Input/CommonInput";
import Label from "@/components/Label/Label";
import WorkbookStatus from "@/components/Status/WorkbookStatus";
import WorkbookTab from "@/components/Tab/WorkbookTab";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState<string>("");

  const changeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  return (
    <>
      <h1>규림바보</h1>
      <br />
      {/* <RadioBtn selected={false} color={"green"} />
      <RadioBtn selected color={"green"} />
      <RadioBtn selected={false} color={"orange"} />
      <RadioBtn selected color={"orange"} /> */}
      <br />
      <CommonInput
        placeholder={"아이디를 입력하세요"}
        inputText={inputText}
        onChange={changeInputText}
      />
      <br />
      <Label children={"N자 이상 N자 이하"} status={""} />
      <Label children={"N자 이상 N자 이하"} status={"pass"} />
      <Label children={"N자 이상 N자 이하"} status={"fail"} />
      <WorkbookStatus status="progress" />
      <WorkbookStatus status="loading" />
      <WorkbookStatus status="completed" />
      <br />
      <RoleBtn role={"teacher"} selected={false} />
      <RoleBtn role={"student"} selected />
      <br />
      <ProblemResultBtn value={"1"} isCorrect />
      <ProblemResultBtn value={"2"} isCorrect={false} />
      <br />
      {/* <ExportBtn type={"make"} selected={false} />
      <ExportBtn type={"release"} selected />
      <ExportBtn type={"pdf"} selected /> */}
    </>
  );
}
