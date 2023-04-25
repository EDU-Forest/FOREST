import { CommonInput } from "@/components/Input/Input.style";
import { SignupInputBox, SignupLabel } from "./SignupModal.style";
import Label from "@/components/Label/Label";
import { SignupLabelBox } from "./SignupInput.style";

interface validations {
  [key: string]: string;
}

export interface Iprops {
  label: string;
  name: string;
  isShort?: any;
  type: string;
  placeholder: string;
  validations: validations;
  value: string;
  abcde?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignupInput({
  label,
  name,
  isShort = false,
  type,
  placeholder,
  value,
  onChange,
  validations,
}: Iprops) {
  return (
    <SignupInputBox>
      <SignupLabel htmlFor={name}>{label}</SignupLabel>
      <CommonInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <SignupLabelBox>
        {Object.entries(validations).map(([key, value]) => (
          <Label status={value}>{key}</Label>
        ))}
      </SignupLabelBox>
    </SignupInputBox>
  );
}
