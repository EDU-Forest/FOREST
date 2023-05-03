import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

const SearchTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 0.75rem;
  ${flexBox("row", "center", "space-between")};
`;

const SearchDefaultWrapper = styled.div`
  padding: 1rem;
`;

const PopularOption = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.Gray[500]};
  span {
    &:nth-of-type(1) {
      margin-right: 24px;
    }
  }
`;

const PopularOptionItem = styled.span<{ selected?: boolean }>`
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      font-weight: 700;
      color: black;
    `}
`;

const SearchDefalutListWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}

  .swiper-wrapper {
    min-width: calc(100vw - 16rem);
  }
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
  PopularOption,
  PopularOptionItem,
  SearchDefalutListWrapper,
  SearchListWrapper,
  SearchListItem,
};
