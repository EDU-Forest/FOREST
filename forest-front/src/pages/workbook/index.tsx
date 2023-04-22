import ExportBtn from "@/components/Button/ExportBtn";
import TeacherNav from "@/components/Nav/TeacherNav";
import { Container, FullScreen } from "@/styles/container";
import { useState } from "react";

export default function Workbook() {
  const [selectedType, setSelectedType] = useState("");

  const selectType = (type: string) => {
    setSelectedType(type);
  };
  return (
    <FullScreen>
      <TeacherNav nowLocation={"workbook"} />
      <Container></Container>
    </FullScreen>
  );
}
