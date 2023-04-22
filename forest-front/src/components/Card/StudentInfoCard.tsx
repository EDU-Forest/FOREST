import { flexBox } from "@/styles/theme";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

interface Iprops {
  children: string;
}

const StyledStudentInfoCard = styled.div`
  ${flexBox("column", "start", "center")}
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #74b816 0%, #94d82d 100%);
  color: white;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  width: 30.5rem;
  height: 3rem;
  padding: 1rem 1.5rem;
`;

const StudentInfoCardInner = styled.div`
  ${flexBox("row", "end", "space-between")}
  margin-bottom: 0.75rem;

  .close-icon {
    font-size: 1.1875rem;
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

export default function StudentInfoCard() {
  return (
    <StyledStudentInfoCard>
      <StudentInfoCardInner>
        <div>
          <StudentInfoCardName>양희제</StudentInfoCardName>
          <StudentInfoCardText>27세</StudentInfoCardText>
        </div>
        <MdClose className="close-icon" />
      </StudentInfoCardInner>
      <div>
        <StudentInfoCardText>abc@gmail.com</StudentInfoCardText>
        <StudentInfoCardText>|</StudentInfoCardText>
        <StudentInfoCardText>010-1234-5678</StudentInfoCardText>
      </div>
    </StyledStudentInfoCard>
  );
}
