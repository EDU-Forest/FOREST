import UserForm from "@/features/home/UserForm";
import { SignupContainer, SignupLayout } from "@/features/signup/Signup.style";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";

interface Iprops {
  email: string;
  onClose: () => void;
}

interface IServerSideProps {
  query: {
    email: string;
  };
}

function Signup({ email, onClose }: Iprops) {
  return (
    <SignupContainer>
      <UserForm type={"signup"} onClose={onClose} email={email} />
    </SignupContainer>
  );
}

export default avoidDuplicateLoginAuth(Signup);

export const getServerSideProps = async ({ query: { email } }: IServerSideProps) => {
  return {
    props: {
      email,
    },
  };
};
