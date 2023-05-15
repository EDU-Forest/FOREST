import { Title } from "@/styles/text";

import { SearchContainerInput, SearchContainerWrapper } from "./SearchContainer.style";
import { useState } from "react";
import SearchInput from "@/components/Input/SearchInput";
import HashTag from "@/components/HashTag/HashTag";
import SearchDefaultList from "./SearchDefaultList";
import SearchList from "./SearchList";

export default function SearchContainer() {
  const [inputSearch, setInputSearch] = useState<string>("");
  const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const searchKeyword = (value: string) => {
    setInputSearch(value);
  };

  return (
    <SearchContainerWrapper>
      <SearchContainerInput>
        <SearchInput inputText={inputSearch} onChange={changeSearchText} />
        <HashTag value="수능" onClick={(value: string) => searchKeyword(value)} />
        <HashTag value="영어" onClick={(value: string) => searchKeyword(value)} />
        <HashTag value="싸피" onClick={(value: string) => searchKeyword(value)} />
        <HashTag value="센스" onClick={(value: string) => searchKeyword(value)} />
        <HashTag value="CS" onClick={(value: string) => searchKeyword(value)} />
      </SearchContainerInput>
      {inputSearch ? <SearchList keyword={inputSearch} /> : <SearchDefaultList />}
    </SearchContainerWrapper>
  );
}
