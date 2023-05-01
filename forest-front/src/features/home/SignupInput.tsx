import { CommonInput } from "@/components/Input/Input.style";
import { SignupInputBox, SignupLabel } from "./SignupModal.style";
import Label from "@/components/Label/Label";
import { SignupLabelBox } from "./Home.style";

interface validations {
  [key: string]: string | undefined;
}

export interface Iprops {
  email?: string;
  formType?: "signup" | "moreinfo";
  label: string;
  name: string;
  isShort?: boolean;
  type: string;
  placeholder: string;
  validations: validations;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLElement>, name: string) => void;
}

export default function SignupInput({
  email,
  formType,
  label,
  name,
  isShort = false,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
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
        value={formType === "moreinfo" && name === "email" ? email : value}
        onChange={onChange}
        isShort={isShort}
        disabled={formType === "moreinfo"}
      />
      <SignupLabelBox>
        {Object.entries(validations).map(([key, value]) => (
          <Label status={value ? value : ""}>{key}</Label>
        ))}
      </SignupLabelBox>
    </SignupInputBox>
  );
}
