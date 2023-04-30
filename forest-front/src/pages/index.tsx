import ClassBtn from "@/components/Button/ClassBtn";
import CommonBtn from "@/components/Button/CommonBtn";
import RadioBtn from "@/components/Button/RadioBtn";
import StartBtn from "@/components/Button/StartBtn";
import HashTag from "@/components/HashTag/HashTag";
import CommonInput from "@/components/Input/CommonInput";
import SearchInput from "@/components/Input/SearchInput";
import Label from "@/components/Label/Label";
import { useState } from "react";

export default function Home() {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const changeSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };
  const changeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  return (
    <>
      <h1>규림바보</h1>

      <CommonBtn children={"BUTTON"} colored={false} />
      <CommonBtn children={"BUTTON"} colored={true} />
      <StartBtn children={"시작하기"} />
      <br />
      <ClassBtn children={"싸피 고등학교 3학년"} selected={false} />
      <br />
      <ClassBtn children={"싸피 고등학교 3학년"} selected={true} />
      <br />
      <RadioBtn selected={false} />
      <RadioBtn selected={true} />
      <br />
      <SearchInput inputText={inputSearch} onChange={changeSearchText} />
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
      <HashTag children="검색어" />
    </>
  );
}
