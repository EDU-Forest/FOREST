import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const SearchTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
`;

const SearchListWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
`;

export { SearchTitle, SearchListWrapper };
