import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const SearchTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
`;

const SearchDefaultWrapper = styled.div`
  padding: 1rem;
`;

const SearchDefalutListWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
`;

const SearchListWrapper = styled.div`
  ${flexBox("row", "center", "start")}
  flex-wrap: wrap;
  padding: 1rem;
  margin-top: 2rem;

  @media ${({ theme }) => theme.tablet} {
    padding: 0rem;
  }
`;

const SearchListItem = styled.div`
  width: 20%;
  margin: 2.5%;

  @media ${({ theme }) => theme.tablet} {
    width: 22%;
    margin: 1.5%;
  }

  @media (min-width: 76.25rem) {
    width: 17%;
    margin: 1.5%;
  }
`;

export {
  SearchTitle,
  SearchDefaultWrapper,
  SearchDefalutListWrapper,
  SearchListWrapper,
  SearchListItem,
};
