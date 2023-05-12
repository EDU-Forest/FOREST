import Toast from "@/components/Toast/Toast";
import Login from "@/features/home/Login";
import { RootState } from "@/stores/store";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import withAuth from "@/utils/auth/withAuth";
import { useEffect, useState } from "react";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

function AuthLogin() {
  const { toastState } = useSelector((state: RootState) => state.toast);

  const payload = {
    title: "이메일 또는 비밀번호가 일치하지 않습니다.",
  };

  return (
    <>
      {toastState && <Toast {...payload} icon={<IoMdCloseCircleOutline />} />}
      <Login />
    </>
  );
}
export default avoidDuplicateLoginAuth(AuthLogin);
