import Modal from "@/components/Modal/Modal";
import UserForm from "@/features/home/UserForm";

interface Iprops {
  onClose: () => void;
}

export default function Signup({ onClose }: Iprops) {
  return <UserForm type={"signup"} onClose={onClose} />;
}
