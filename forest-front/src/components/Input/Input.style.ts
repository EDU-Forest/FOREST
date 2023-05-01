import styled from "styled-components";

const CommonInput = styled.input<{ isShort?: boolean; isScore?: boolean }>`
  /* width: 15rem; */
  width: ${({ isShort, isScore }) => (isShort ? "15rem" : isScore && "5rem")};
  font-weight: 400;
  border-radius: 0.5rem;
  border: 0.5px solid ${({ theme }) => theme.colors.Gray[500]};
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.Gray[50]};

  /* &:invalid {
    background-color: red;
  } */

  @media ${({ theme }) => theme.tablet} {
    width: ${({ isScore }) => isScore && "3rem"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.Lime[500]};
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* &[type="date"]::before {
    content: attr(data-placeholder);
    width: 100%;
  }

  &[type="date"]:focus::before,
  &[type="date"]:valid::before {
    display: none;
  } */
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 4rem;
  font-size: 1.25rem;
  padding: 1rem 5rem 1rem 2.5rem;

  @media ${({ theme }) => theme.tablet} {
    width: 100%;
    height: 3rem;
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
