import Modal from "@/components/Modal/Modal";
import UserForm from "@/features/home/UserForm";
import { SignupLayout } from "@/features/signup/Signup.style";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import withAuth from "@/utils/auth/withAuth";

interface Iprops {
  onClose: () => void;
}

function Signup({ onClose }: Iprops) {
  return <UserForm type={"signup"} onClose={onClose} />;
}

export default avoidDuplicateLoginAuth(Signup);
