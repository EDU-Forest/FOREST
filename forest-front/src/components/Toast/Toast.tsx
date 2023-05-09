import { PropsWithChildren } from "react";
import { ToastTitleBox } from "./Toast.style";

function Toast({ children }: PropsWithChildren) {
  return <ToastTitleBox>{children}</ToastTitleBox>;
}

export default Toast;
