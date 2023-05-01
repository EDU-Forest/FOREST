import { Title } from "@/styles/text";
import { flexBox, positionCenter } from "@/styles/theme";
import styled from "styled-components";

const SignupForm = styled.form`
  ${positionCenter("absolute")}
  transform: translate(-50%, -30%);
  width: 37.5rem;
  padding: 2.5rem 2rem;
  background-color: white;
  box-shadow: 0.25rem 0.25rem 0.625rem rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-radius: 16px;
`;

const SignupTitleBox = styled.div`
  ${flexBox("row", "center", "flex-start")}
  position: relative;
`;

const SignupTitle = styled(Title)`
  margin-left: 1rem;
  margin-bottom: 0px;
`;

const SignupHr = styled.hr`
  margin: 1rem 0rem;
  height: 0.0625rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Gray[400]};
`;

const SignupContentBox = styled.div`
  padding: 0px 0.5rem;
`;

// const SignupBtn = styled.button`
//   width: 5.75rem;
//   height: 2.1875rem;
//   line-height: 2.1875rem;
//   border: none;
//   background-color: ${({ theme }) => theme.colors.Lime[600]};
//   border-radius: 2rem;
//   font-size: 1rem;
//   color: white;
//   font-weight: bold;
// `;

const SignupSubmitBox = styled.div`
  text-align: center;
`;

const SignupInputBox = styled.div`
  padding: 1rem 0px;
  display: flex;
  flex-direction: column;
`;

const SignupLabel = styled.label`
  color: ${({ theme }) => theme.colors.Gray[500]};
  font-weight: 600;
  margin-bottom: 0.5rem;

  &:focus {
    color: ${({ theme }) => theme.colors.Gray[900]};
  }
`;

const SignupErrorMsg = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Orange[500]};
`;

const SignupPasswordBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignupRoleBox = styled.div`
  margin-top: 1rem;
`;

export {
  SignupForm,
  SignupTitleBox,
  SignupContentBox,
  SignupSubmitBox,
  SignupInputBox,
  SignupPasswordBox,
  SignupTitle,
  SignupHr,
  SignupLabel,
  SignupErrorMsg,
  SignupRoleBox,
};
