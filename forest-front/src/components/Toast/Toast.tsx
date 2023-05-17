import { useEffect } from "react";
import { ToastBox } from "./Toast.style";

interface IProps {
  icon?: any;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  setIsOpen: any;
}

function Toast({ icon, title, subtitle, isOpen, setIsOpen }: IProps) {
  useEffect(() => {
    // 1.5초 후 토스트 팝업 사라짐
    isOpen &&
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
  }, [isOpen]);

  return (
    <ToastBox isOpen={isOpen}>
      {icon ? icon : <></>}
      <div>
        {subtitle && <p>{subtitle}</p>}
        <p>{title}</p>
      </div>
    </ToastBox>
  );
}

export default Toast;
