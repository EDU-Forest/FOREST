import { flexBox, scrollBar } from "@/styles/theme";
import styled from "styled-components";

const ClassSelectModalContainer = styled.div`
  position: relative;
  width: 11.25rem;
  background-color: white;
  box-shadow: 0rem 0.125rem 0.3125rem 0.0625rem rgba(0, 0, 0, 0.15);
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  margin-top: 0.5rem;
`;

const ClassSelectModalEach = styled.div`
  ${scrollBar(0.5)}
  min-height: 2.5rem;
  max-height: 168px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem 0rem;
`;

const ClassSelectModalEachItem = styled.div`
  ${flexBox("row", "center", "center")}
  width: 11.25rem;
  height: 2rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Gray[700]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray[100]};
  }
`;

const ClassSelectModalAdd = styled.div`
  ${flexBox("row", "center", "center")}
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.Lime[700]};
  width: 11.25rem;
  min-height: 2rem;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.Lime[100]};
  color: ${({ theme }) => theme.colors.Lime[700]};
`;

export {
  ClassSelectModalContainer,
  ClassSelectModalEach,
  ClassSelectModalEachItem,
  ClassSelectModalAdd,
};
