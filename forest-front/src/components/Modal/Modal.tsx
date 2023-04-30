import { Fragment, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { BackDropContainer } from "./Modal.style";
interface ModalProps {
  onClose: () => void;
}
const BackDrop = (props: ModalProps) => {
  return <BackDropContainer onClick={props.onClose}></BackDropContainer>;
};

const ModalOverlay = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};
const Modal = (props: PropsWithChildren<ModalProps>) => {
  const selectedElement = document.getElementById("_modal");
  if (selectedElement === null) {
    return <div></div>;
  }
  return (
    <Fragment>
      {/* {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, selectedElement)} */}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, selectedElement)}
    </Fragment>
  );
};

export default Modal;
