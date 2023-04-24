import { flexBox, scrollBar } from "@/styles/theme";
import styled from "styled-components";

const ClassSelectedTitle = styled.div`
  font-weight: 700;
  height: 24px;
  line-height: 24px;

  .icon {
    font-size: 1.375rem;
    margin-left: 8px;
    vertical-align: text-bottom;
  }
`;
const ClassSelectModalContainer = styled.div`
  position: relative;
  width: 180px;
  background-color: white;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 8px 8px;
  margin-top: 8px;
`;

const ClassSelectModalEach = styled.div`
  ${scrollBar(0.5)}
  min-height: 40px;
  max-height: 160px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px 0px;
`;

const ClassSelectModalEachItem = styled.div`
  ${flexBox("row", "center", "center")}
  position: relative;
  width: 180px;
  height: 32px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.Gray[700]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray[100]};
  }
`;

const ClassSelectModalAdd = styled.div`
  ${flexBox("row", "center", "center")}
  font-size: 14px;
  border-top: 0.0625rem solid ${({ theme }) => theme.colors.Lime[700]};
  width: 180px;
  min-height: 32px;
  border-radius: 0px 0px 8px 8px;
  background-color: ${({ theme }) => theme.colors.Lime[100]};
  color: ${({ theme }) => theme.colors.Lime[700]};
  cursor: pointer;
`;

const ClassSelectCircle = styled.div`
  display: inline-block;
  position: absolute;
  left: 16px;
  border-radius: 100%;
  width: 8px;
  height: 8px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
`;

export {
  ClassSelectedTitle,
  ClassSelectModalContainer,
  ClassSelectModalEach,
  ClassSelectModalEachItem,
  ClassSelectModalAdd,
  ClassSelectCircle,
};
