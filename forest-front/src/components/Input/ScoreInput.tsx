import { ChangeEvent } from "react";
import { CommonInput } from "./Input.style";

interface Iprops {
  maxScore?: number;
  id: string;
  name: string;
  placeholder?: string;
  inputScore: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function ScoreInput({
  maxScore,
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
      type="text"
      min={0}
      max={maxScore}
      placeholder={placeholder}
      value={inputScore}
      onChange={onChange}
      isScore
    />
  );
}
