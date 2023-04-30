import styled from "styled-components";
import { flexBox, positionCenter } from "@/styles/theme";
import { Title } from "@/styles/text";

// --- AuthWithEmail ---

const EmailAuthBox = styled.div`
  ${flexBox("row", "center", "space-between")}
  width: 12.75rem;

  p {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.Gray[600]};
  }

  .link {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.Gray[900]};
    }
  }
`;

// const GrayText = styled.div`
//   font-weight: bold;
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.colors.Gray[600]};
// `;

// --- KakaoLogin ---

const KakaoLoginBtn = styled.button`
  width: 22.5rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #ffe90d;
  position: relative;
  margin-bottom: 0.75rem;
  border: none;

  &:hover {
    background-color: #efdb0f;
  }
`;

const KakaoLoginImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  top: 50%;
  left: 1.125rem;
  transform: translate(0%, -50%);
`;

const KakaoLoginText = styled.div`
  ${positionCenter()}
  font-size: 1rem;
  font-weight: bold;
`;

// --- LoginModal ---

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

// --- SignupInput ---

// const SignupInputBox = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const SignupLabelBox = styled.div`
  display: flex;
`;

// --- SignupModal ---

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

const SignupInputRowBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignupRoleBox = styled.div`
  margin-top: 1rem;
`;

export {
  EmailAuthBox,
  KakaoLoginBtn,
  KakaoLoginImg,
  KakaoLoginText,
  LoginForm,
  LoginTitleBox,
  LoginContentBox,
  LoginSubmitBox,
  LoginInputBox,
  LoginTitle,
  LoginHr,
  LoginLabel,
  LoginErrorMsg,
  // SignupInputBox,
  SignupLabelBox,
  SignupForm,
  SignupTitleBox,
  SignupContentBox,
  SignupSubmitBox,
  SignupInputBox,
  SignupInputRowBox,
  SignupTitle,
  SignupHr,
  SignupLabel,
  SignupErrorMsg,
  SignupRoleBox,
};
