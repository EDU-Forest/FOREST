import styled from "styled-components";
import { MdSchool } from "react-icons/md";
import { flexBox } from "@/styles/theme";

interface Iprops {
  children: string;
}

const StyledClassInfoCard = styled.div`
    position: relative;
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.Lime[100]}}
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.Lime[900]}}
    font-size: 1.375rem;
    font-weight: 700;
    box-shadow: 0 .25rem .25rem 0 rgba(0, 0, 0, 0.25);
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

export default function ClassInfoCard({ children }: Iprops) {
  return (
    <StyledClassInfoCard>
      <MdSchool className="school-icon" />
      {children}
    </StyledClassInfoCard>
  );
}
