import styled from "styled-components";
import { flexBox } from "@/styles/theme";

const StyledClassInfoCard = styled.div`
  position: relative;
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.Lime[100]};
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.Lime[900]};
  font-size: 1.375rem;
  font-weight: 700;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  width: 26rem;
  height: 2rem;
  padding: 1rem 1.5rem 1rem 4.875rem;
  line-height: 2rem;

  .school-icon {
    position: absolute;
    left: 1.5rem;
    font-size: 2rem;
  }

  @media ${({ theme }) => theme.tablet} {
    font-size: 16px;
    width: 25.5rem;
  }
`;

const StyledStudentInfoCard = styled.div`
  ${flexBox("column", "start", "center")}
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #74b816 0%, #94d82d 100%);
  color: white;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  height: 5rem;
  padding: 1rem 1.5rem;
  margin: 0.5rem 0;
  @media ${({ theme }) => theme.tablet} {
    width: 100%;
  }

  @media (min-width: 67.5rem) {
    width: 48%;
  }
  @media (min-width: 108rem) {
    width: 31%;
  }
`;

const StudentInfoCardInner = styled.div`
  ${flexBox("row", "end", "space-between")}
  margin-bottom: 0.75rem;

  .close-icon {
    font-size: 1.1875rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.Lime[700]};
    }
  }
`;

const StudentInfoCardName = styled.span`
  font-weight: 700;
  margin-right: 1rem;
`;

const StudentInfoCardText = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  margin-right: 1rem;
`;

export {
  StyledClassInfoCard,
  StyledStudentInfoCard,
  StudentInfoCardInner,
  StudentInfoCardName,
  StudentInfoCardText,
};
