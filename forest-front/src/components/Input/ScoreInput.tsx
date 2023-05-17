import { CommonInput } from "./Input.style";

interface Iprops {
  maxInput?: number;
  id: string;
  name: string;
  placeholder?: string;
  inputScore?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ScoreInput({
  maxInput,
  id,
  name,
  placeholder,
  inputScore,
  onChange,
}: Iprops) {
  return (
    <CommonInput
      id={id}
      name={name}
      max={maxInput}
      placeholder={placeholder}
      value={inputScore}
      onChange={onChange}
      isScore
      style={{ padding: "0.5rem" }}
    />
  );
}
