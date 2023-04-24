import { StyledCommonInput } from "./Input.style";

interface Iprops {
  placeholder: string;
  inputText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export default function CommonInput({ placeholder, inputText, onChange }: Iprops) {
  return <StyledCommonInput placeholder={placeholder} value={inputText} onChange={onChange} />;
}
