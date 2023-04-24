import styled from "styled-components";

const SearchContainerWrapper = styled.div`
  margin: 2rem;
  width: calc(100% - 8rem);
  min-height: calc(100% - 8rem);
  padding: 2rem;

  background: white;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;

  @media ${({ theme }) => theme.tablet} {
    width: calc(100% - 7rem);
    min-height: calc(100% - 7rem);
    padding: 1.5rem;
  }
`;

const SearchContainerInput = styled.div`
  width: calc(100% - 6rem);
  margin: auto;
  margin-top: 2.5rem;

  @media ${({ theme }) => theme.tablet} {
    width: calc(100% - 2.25rem);
    margin-top: 1.875rem;
  }
`;

export { SearchContainerWrapper, SearchContainerInput };
