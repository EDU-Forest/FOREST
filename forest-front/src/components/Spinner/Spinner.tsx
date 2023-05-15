import { SpinnerBox } from "./Spinner.style";

export default function Spinner() {
  return (
    <SpinnerBox className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </SpinnerBox>
  );
}
