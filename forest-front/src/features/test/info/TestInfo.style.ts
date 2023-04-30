import styled from "styled-components";

const StyledTestInfoBox = styled.div`
  width: 32.5rem;
  padding: 0.75rem 3.5rem;

  background-color: ${({ theme }) => theme.colors.Lime[100]};
  box-shadow: 4px 4px 4px rgba(157, 157, 157, 0.25);
  border-radius: 24px;
`;

const StyledTestInfoContainer = styled.div`
  width: 600px;
  padding: 4rem 6rem;
  box-shadow: 0.625rem 0.625rem 0.625rem 0.25rem rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TestStartImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

const StyledTestInfoTitleBox = styled.div`
  margin: 32px 16px;
  font-size: 22px;
  font-weight: 700;
`;

const StyledTestInfoContent = styled.div`
  padding: 0.75rem 0rem;
  display: flex;
  align-items: center;
`;

const StyledTestInfoLabel = styled.div`
  width: 120px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 32px;
  margin-right: 32px;
`;

const StyledTestInfoText = styled.div`
  font-size: 16px;
`;

// const StyledTestInfoBtn = styled.button`
//   width: 15rem;
//   height: 2.5rem;
//   background-color: ${({ theme }) => theme.colors.Lime[700]};
//   border: none;
//   border-radius: 1.5rem;
//   line-height: 2.5rem;
//   text-align: center;
//   color: white;
//   margin-top: 3rem;
//   font-weight: 700;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.Lime[900]};
//   }
// `;

export {
  StyledTestInfoBox,
  StyledTestInfoContainer,
  TestStartImg,
  StyledTestInfoTitleBox,
  StyledTestInfoLabel,
  StyledTestInfoContent,
  StyledTestInfoText,
};
