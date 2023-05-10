import styled from "styled-components";
import { flexBox, positionCenter } from "@/styles/theme";
import { Title } from "@/styles/text";

// --- AuthWithEmail ---

const EmailAuthBox = styled.div`
  ${flexBox("row", "center", "space-between")}
  width: 204px;

  p {
    font-size: 14px;
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
//   font-size: 14px;
//   color: ${({ theme }) => theme.colors.Gray[600]};
// `;

// --- KakaoLogin ---

const KakaoLoginBtn = styled.a`
  width: 360px;
  height: 48px;
  border-radius: 8px;
  background-color: #ffe90d;
  position: relative;
  margin-bottom: 12px;
  border: none;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #efdb0f;
  }
`;

const KakaoLoginImg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate(0%, -50%);
`;

const KakaoLoginText = styled.div`
  ${positionCenter()}
  font-size: 16px;
  font-weight: bold;
`;

// --- LoginModal ---

const LoginForm = styled.form`
  ${positionCenter("absolute")}
  width: 600px;
  padding: 40px 32px;
  background-color: white;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-radius: 1rem;
`;

const LoginTitleBox = styled.div`
  ${flexBox("row", "center", "flex-start")}
  position: relative;
`;

const LoginTitle = styled(Title)`
  margin-left: 16px;
  margin-bottom: 0rem;
`;

const LoginHr = styled.hr`
  margin: 16px 0px;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.colors.Gray[400]};
`;

const LoginContentBox = styled.div`
  padding: 0rem 8px;
`;

// const LoginBtn = styled.button`
//   width: 92px;
//   height: 35px;
//   line-height: 35px;
//   border: none;
//   background-color: ${({ theme }) => theme.colors.Lime[600]};
//   border-radius: 32px;
//   font-size: 16px;
//   color: white;
//   font-weight: bold;
// `;

const LoginSubmitBox = styled.div`
  text-align: center;
`;

const LoginInputBox = styled.div`
  padding: 16px 0rem;
  display: flex;
  flex-direction: column;
`;

const LoginLabel = styled.label`
  color: ${({ theme }) => theme.colors.Gray[500]};
  font-weight: 700;
  margin-bottom: 8px;

  &:focus {
    color: ${({ theme }) => theme.colors.Gray[900]};
  }
`;

const LoginErrorMsg = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.Orange[500]};
  padding-top: 0.25rem;
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
  width: 600px;
  padding: 40px 32px;
  background-color: white;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-radius: 1rem;
`;

const SignupTitleBox = styled.div`
  ${flexBox("row", "center", "flex-start")}
  position: relative;
`;

const SignupTitle = styled(Title)`
  margin-left: 16px;
  margin-bottom: 0rem;
`;

const SignupHr = styled.hr`
  margin: 16px 0px;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.colors.Gray[400]};
`;

const SignupContentBox = styled.div`
  padding: 0rem 8px;
`;

// const SignupBtn = styled.button`
//   width: 92px;
//   height: 35px;
//   line-height: 35px;
//   border: none;
//   background-color: ${({ theme }) => theme.colors.Lime[600]};
//   border-radius: 32px;
//   font-size: 16px;
//   color: white;
//   font-weight: bold;
// `;

const SignupSubmitBox = styled.div`
  text-align: center;
`;

const SignupInputBox = styled.div`
  padding: 16px 0rem;
  display: flex;
  flex-direction: column;
`;

const SignupLabel = styled.label`
  color: ${({ theme }) => theme.colors.Gray[500]};
  font-weight: 600;
  margin-bottom: 8px;

  &:focus {
    color: ${({ theme }) => theme.colors.Gray[900]};
  }
`;

const SignupErrorMsg = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.Orange[500]};
`;

const SignupInputRowBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignupRoleBox = styled.div`
  margin-top: 16px;
`;

const LoginLabelBox = styled(SignupLabelBox)``;

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
  LoginLabelBox,
};
