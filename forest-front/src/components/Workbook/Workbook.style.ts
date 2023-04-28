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

const WorkbookTitle = styled.p`
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

  cursor: pointer;
`;

const WorkbookContentWrapper = styled.div``;

const WorkbookIcon = styled.span`
  margin-right: 0.25rem;
`;

const WorkbookContent = styled.span`
  margin-right: 0.75rem;
  font-weight: 300;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Gray[700]};
`;

export {
  WorkbookCard,
  WorkbookImg,
  WorkbookTitle,
  WorkbookContentWrapper,
  WorkbookIcon,
  WorkbookContent,
};
