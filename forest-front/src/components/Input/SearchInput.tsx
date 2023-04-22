import styled from "styled-components";
import { GrSearch } from "react-icons/gr";

const StyledSearchInput = styled.input`
  width: calc(100% - 7.5rem);
  height: 1.8rem;
  font-size: 1.25rem;
  padding: 1rem 5rem 1rem 2.5rem;

  @media ${({ theme }) => theme.tablet} {
    width: calc(100% - 6rem);
    height: 1.8rem;
    font-size: 1rem;
    padding: 0.5rem 4rem 0.5rem 2rem;
  }

  background-color: white;
  border-radius: 2.5rem;
  border: 2px solid ${({ theme }) => theme.colors.Gray[500]};
  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[400]};
  }
  &:focus {
    border: 2px solid black;
  }
`;

const SearchInputDiv = styled.div`
  position: relative;
  width: 100%;
  .search-icon {
    font-size: 2rem;
    position: absolute;
    top: 1.125rem;
    right: 2.5rem;
  }

  @media ${({ theme }) => theme.tablet} {
    width: 100%;

    .search-icon {
      font-size: 1.5rem;
      position: absolute;
      top: 0.875rem;
      right: 2rem;
    }
  }
`;

interface Iprops {
  inputText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
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
