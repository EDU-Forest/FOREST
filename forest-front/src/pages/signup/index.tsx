import UserForm from "@/features/home/UserForm";
import { SignupContainer, SignupLayout } from "@/features/signup/Signup.style";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";

interface Iprops {
  onClose: () => void;
}

function Signup({ onClose }: Iprops) {
  return (
    <SignupContainer>
      <UserForm type={"signup"} onClose={onClose} />
    </SignupContainer>
  );
}

export default avoidDuplicateLoginAuth(Signup);
