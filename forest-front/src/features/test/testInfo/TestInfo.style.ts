import styled from "styled-components";

const TestInfoWrapper = styled.div`
  width: 32.5rem;
  padding: 1rem, 3.5rem;
  background-color: ${({ theme }) => theme.colors.Lime[100]};
  box-shadow: 0.25rem 0.25rem 0.25rem rgba(157, 157, 157, 0.25);
  border-radius: 1.5rem;
`;

const StyledTestInfoContainer = styled.div`
  width: 50rem;
  padding: 6.5rem 8.75rem;
  box-shadow: 10px 10px 10px 4px rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TestStartImg = styled.img`
  width: 22.5rem;
  height: 400px;
`;

const StyledTestInfoTitleBox = styled.div`
  margin: 24px;
  font-size: 2rem;
  font-weight: 700;
`;

export { TestInfoWrapper, StyledTestInfoContainer, TestStartImg, StyledTestInfoTitleBox };
