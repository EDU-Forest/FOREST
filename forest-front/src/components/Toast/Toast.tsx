import { useEffect } from "react";
import { ToastBox } from "./Toast.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setToastAnimation, setToastState } from "@/stores/toast/toast";

interface IProps {
  icon?: any;
  title: string;
  subtitle?: string;
}

function Toast({ icon, title, subtitle }: IProps) {
  const dispatch = useDispatch();
  const { toastAnimation } = useSelector((state: RootState) => state.toast);
  // useEffect(() => {
  // 1.5초 후 토스트 팝업 사라짐
  //   isOpen &&
  //     setTimeout(() => {
  //       setIsOpen(false);
  //     }, 1500);
  // }, [isOpen]);

  useEffect(() => {
    let timer2: ReturnType<typeof setTimeout>;
    let timer = setTimeout(() => {
      dispatch(setToastAnimation("toast-alert closeAnimation"));
      timer2 = setTimeout(() => {
        dispatch(setToastState(false));
      }, 500);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <ToastBox className={toastAnimation}>
      {icon && icon}
      <div>
        {subtitle && <p>{subtitle}</p>}
        <p>{title}</p>
      </div>
    </ToastBox>
  );
}

export default Toast;
