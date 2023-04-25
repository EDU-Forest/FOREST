import { Iprops } from "@/features/home/SignupInput";
import styled from "styled-components";

const CommonInput = styled.input`
  /* width: 15rem; */
  font-weight: 400;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.Gray[500]};
  padding: 0.5rem 1rem;

  &:invalid {
    background-color: red;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.Lime[500]};
  }
`;

const StyledSearchInput = styled.input`
  width: calc(100% - 7.5rem);
  height: 1.8rem;
  font-size: 1.25rem;
  padding: 1rem 5rem 1rem 2.5rem;

  @media ${({ theme }) => theme.tablet} {
    width: calc(100% - 6rem);
    height: 1.8rem;
    font-size: 1rem;
    padding: 1rem 4rem 1rem 2rem;
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

export { CommonInput, StyledSearchInput, SearchInputDiv };
