import { StyledCommonInput } from "./Input.style";

interface Iprops {
  placeholder: string;
  inputText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  width?: number;
}

export default function CommonInput({ placeholder, inputText, onChange, width }: Iprops) {
  return (
    <StyledCommonInput
      width={width}
      placeholder={placeholder}
      value={inputText}
      onChange={onChange}
    />
  );
}
