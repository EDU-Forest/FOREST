import { Title } from "@/styles/text";
import { flexBox, positionCenter } from "@/styles/theme";
import styled from "styled-components";

const LoginForm = styled.form`
  ${positionCenter("absolute")}
  width: 37.5rem;
  padding: 2.5rem 2rem;
  background-color: white;
  box-shadow: 0.25rem 0.25rem 0.625rem rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-radius: 16px;
`;

const LoginTitleBox = styled.div`
  ${flexBox("row", "center", "flex-start")}
  position: relative;
`;

const LoginTitle = styled(Title)`
  margin-left: 1rem;
  margin-bottom: 0px;
`;

const LoginHr = styled.hr`
  margin: 1rem 0rem;
  height: 0.0625rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Gray[400]};
`;

const LoginContentBox = styled.div`
  padding: 0px 0.5rem;
`;

// const LoginBtn = styled.button`
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

const LoginSubmitBox = styled.div`
  text-align: center;
`;

const LoginInputBox = styled.div`
  padding: 1rem 0px;
  display: flex;
  flex-direction: column;
`;

const LoginLabel = styled.label`
  color: ${({ theme }) => theme.colors.Gray[500]};
  font-weight: 700;
  margin-bottom: 0.5rem;

  &:focus {
    color: ${({ theme }) => theme.colors.Gray[900]};
  }
`;

const LoginErrorMsg = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Orange[500]};
`;

export {
  LoginForm,
  LoginTitleBox,
  LoginContentBox,
  LoginSubmitBox,
  LoginInputBox,
  LoginTitle,
  LoginHr,
  LoginLabel,
  LoginErrorMsg,
};
