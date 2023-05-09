import Modal from "@/components/Modal/Modal";
import UserForm from "@/features/home/UserForm";
import { SignupLayout } from "@/features/signup/Signup.style";
import { Container } from "@/styles/container";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import withAuth from "@/utils/auth/withAuth";

interface Iprops {
  onClose: () => void;
}

function Signup({ onClose }: Iprops) {
  return (
    <Container>
      <UserForm type={"signup"} onClose={onClose} />
    </Container>
  );
}

export default avoidDuplicateLoginAuth(Signup);
