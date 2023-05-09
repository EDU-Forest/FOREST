import { PropsWithChildren } from "react";
import { ToastBox } from "./Toast.style";

function Toast({ children }: PropsWithChildren) {
  return <ToastBox>{children}</ToastBox>;
}

export default Toast;
