import Modal from "@/components/Modal/Modal";
import UserForm from "@/features/home/UserForm";
import { SignupLayout } from "@/features/signup/Signup.style";
import withAuth from "@/utils/withAuth";

interface Iprops {
  onClose: () => void;
}

function Signup({ onClose }: Iprops) {
  return <UserForm type={"signup"} onClose={onClose} />;
}

export default withAuth(Signup);
