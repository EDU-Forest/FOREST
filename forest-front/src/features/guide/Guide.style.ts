import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

const GuideNavWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 14rem;
  height: 100vh;
  background-color: white;
  .logo-img {
    width: 6rem;
    cursor: pointer;
  }
`;

const GuideNavItemContainer = styled.div`
  width: 100%;
  margin-top: 80px;
  color: ${({ theme }) => theme.colors.Gray[800]};
`;

const GuideNavItem = styled.div<{ selected: boolean }>`
  ${flexBox("row", "center", "start")}
  width: 100%;
  height: 52px;
  padding: 12px 36px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.Lime[100]};
    `};
`;

const GuideNavSubItem = styled.div`
  padding-left: 48px;
  padding-top: 4px;
  padding-bottom: 6px;
`;

export { GuideNavWrapper, GuideNavItemContainer, GuideNavItem, GuideNavSubItem };
