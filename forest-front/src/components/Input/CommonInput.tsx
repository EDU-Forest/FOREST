import { StyledCommonInput } from "./Input.style";

interface Iprops {
  id: string;
  name: string;
  placeholder: string;
  inputText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export default function CommonInput({ id, name, placeholder, inputText, onChange }: Iprops) {
  return (
    <StyledCommonInput
      id={id}
      name={name}
      placeholder={placeholder}
      value={inputText}
      onChange={onChange}
    />
  );
}
