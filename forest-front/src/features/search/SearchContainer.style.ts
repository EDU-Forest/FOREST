import styled from "styled-components";

const SearchContainerWrapper = styled.div`
  margin: 2rem;
  width: calc(100% - 4rem);
  min-height: calc(100% - 4rem);

  background: white;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
`;

const SearchTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export { SearchContainerWrapper };
