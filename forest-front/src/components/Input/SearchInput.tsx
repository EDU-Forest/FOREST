import { GrSearch } from "react-icons/gr";
import { SearchInputDiv, StyledSearchInput } from "./Input.style";

interface Iprops {
  inputText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export default function SearchInput({ inputText, onChange }: Iprops) {
  return (
    <SearchInputDiv>
      <StyledSearchInput
        placeholder="검색어를 입력해주세요."
        value={inputText}
        onChange={onChange}
        // onKeyDown={onKeyDown}
      />
      <GrSearch className="search-icon" />
    </SearchInputDiv>
  );
}
