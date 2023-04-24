import { Title } from "@/styles/text";

import { SearchContainerInput, SearchContainerWrapper } from "./SearchContainer.style";
import { useState } from "react";
import SearchInput from "@/components/Input/SearchInput";
import HashTag from "@/components/HashTag/HashTag";
import SearchList from "./SearchList";

export default function SearchContainer() {
  const [inputSearch, setInputSearch] = useState<string>("");
  const changeSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const searchKeyword = (keyword: string) => {
    setInputSearch(keyword);
  };
  return (
    <SearchContainerWrapper>
      <Title>문제은행</Title>

      <SearchContainerInput>
        <SearchInput inputText={inputSearch} onChange={changeSearchText} />
        <HashTag value="수능대비" onClick={(value: string) => searchKeyword(value)} />
        <HashTag value="영어" onClick={(value: string) => searchKeyword(value)} />
        <HashTag value="한국사" onClick={(value: string) => searchKeyword(value)} />
      </SearchContainerInput>
      <SearchList />
    </SearchContainerWrapper>
  );
}
