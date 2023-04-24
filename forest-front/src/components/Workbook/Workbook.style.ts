import styled from "styled-components";

const WorkbookCard = styled.div`
  //   width: 160px;
  display: inline-block;
`;

const WorkbookImg = styled.img`
  width: 160px;
  height: 216px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.2);
`;

const WorkbookTitle = styled.p`
  font-weight: 600;
  margin: 0;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const WorkbookContentWrapper = styled.div``;

const WorkbookIcon = styled.span`
  margin-right: 8px;
`;

const WorkbookContent = styled.span`
  margin-right: 16px;
`;

export {
  WorkbookCard,
  WorkbookImg,
  WorkbookTitle,
  WorkbookContentWrapper,
  WorkbookIcon,
  WorkbookContent,
};
