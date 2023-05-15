import { flexBox, scrollBar } from "@/styles/theme";
import styled from "styled-components";

const ClassSelectWrapper = styled.div`
  position: relative;
`;

const ClassSelectedTitle = styled.div`
  font-weight: 700;
  height: 1.5rem;
  line-height: 1.5rem;
  display: flex;

  p {
    cursor: pointer;
  }

  .icon {
    font-size: 1.375rem;
    margin-left: 0.5rem;
    vertical-align: text-bottom;
    cursor: pointer;
  }
`;
const ClassSelectDropdownContainer = styled.div`
  position: absolute;

  width: 11.25rem;
  background-color: white;
  box-shadow: 0rem 0.125rem 0.3125rem 0.0625rem rgba(0, 0, 0, 0.15);
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  margin-top: 0.5rem;
  z-index: 20;
`;

const ClassSelectDropdownEach = styled.div`
  ${scrollBar(0.5)}
  min-height: 2.5rem;
  max-height: 10rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem 0rem;
`;

const ClassSelectDropdownEachItem = styled.div`
  ${flexBox("row", "center", "center")}
  position: relative;
  width: 11.25rem;
  height: 2rem;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.Gray[700]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray[100]};
  }
`;

const ClassSelectNoClass = styled.div`
  ${flexBox("row", "center", "center")};
  color: ${({ theme }) => theme.colors.Orange[700]};
  height: 6rem;
  font-size: 0.875rem;
`;

const ClassSelectDropdownAdd = styled.div`
  ${flexBox("row", "center", "center")}
  font-size: .875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.Lime[700]};
  width: 11.25rem;
  min-height: 2rem;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.Lime[100]};
  color: ${({ theme }) => theme.colors.Lime[700]};
  cursor: pointer;
`;

const ClassSelectCircle = styled.div`
  display: inline-block;
  position: absolute;
  left: 1rem;
  border-radius: 100%;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 1rem;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
`;

export {
  ClassSelectWrapper,
  ClassSelectedTitle,
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectNoClass,
  ClassSelectDropdownAdd,
  ClassSelectCircle,
};
