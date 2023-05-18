import styled from "styled-components";

const CorrectRateWrapper = styled.div`
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  width: 100%;
  background-color: white;

  padding: 1.5rem;
`;

const CorrectRateLabelWrapper = styled.div`
  display: inline-block;
  margin-left: 1rem;
`;

const BarWrapper = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 1.5rem;

  @media ${({ theme }) => theme.tablet} {
    width: 95%;
    margin-right: 5%;
  }
`;

export { CorrectRateWrapper, CorrectRateLabelWrapper, BarWrapper };
