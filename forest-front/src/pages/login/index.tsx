import Toast from "@/components/Toast/Toast";
import Login from "@/features/home/Login";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import withAuth from "@/utils/auth/withAuth";
import { useEffect, useState } from "react";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";

function AuthLogin() {
  const [isError, setIsError] = useState(false);

  const payload = {
    title: "이메일 또는 비밀번호가 일치하지 않습니다.",
    isOpen: isError,
    setIsOpen: setIsError,
  };

  return (
    <>
      {isError && <Toast {...payload} icon={<IoMdCloseCircleOutline />} />}
      <Login setIsError={setIsError} />
    </>
  );
}
export default avoidDuplicateLoginAuth(AuthLogin);
