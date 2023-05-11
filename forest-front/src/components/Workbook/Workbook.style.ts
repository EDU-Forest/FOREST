import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const WorkbookCard = styled.div`
  width: 100%;
  padding: 0.5rem;
  align-items: center;
  display: inline-block;
`;

const WorkbookImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0rem 0rem 0.4375rem 0.125rem rgba(0, 0, 0, 0.2);

  cursor: pointer;
`;

const WorkbookImgBox = styled.div`
  position: relative;
  text-align: center;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const WorkbookTitle = styled.p`
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

  cursor: pointer;
`;

const WorkbookContentWrapper = styled.div`
  ${flexBox("column", "start", "center")}
  gap: .25rem;
`;

const WorkbookIcon = styled.span`
  margin-right: 0.25rem;
  svg {
    vertical-align: text-bottom;
    font-size: 1rem;
    color: red;
    cursor: pointer;
  }
`;

const WorkbookContent = styled.span<{ bg?: boolean }>`
  margin-right: 0.75rem;
  font-weight: 300;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Gray[700]};
  background-color: ${({ bg }) => bg && "#F6F6F6"};
  padding: 0.2rem;
  border-radius: 0.25rem;

  span {
    color: ${({ theme }) => theme.colors.Lime[600]};
    font-weight: 700;
  }
`;

export {
  WorkbookCard,
  WorkbookImg,
  WorkbookTitle,
  WorkbookContentWrapper,
  WorkbookIcon,
  WorkbookContent,
  WorkbookImgBox,
};
