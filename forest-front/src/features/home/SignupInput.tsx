// import { CommonInput } from "@/components/Input/Input.style";
// import { SignupInputBox, SignupLabel } from "./SignupModal.style";
// import Label from "@/components/Label/Label";
// import { SignupLabelBox } from "./Home.style";
// import { checkEmail } from "@/utils";
// import React from "react";

// interface validations {
//   [key: string]: string | undefined;
// }

// export interface Iprops {
//   email?: string;
//   formType?: "signup" | "moreinfo";
//   label: string;
//   name: string;
//   isShort?: boolean;
//   type: string;
//   placeholder: string;
//   validations: validations;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   setValidation: React.Dispatch<React.SetStateAction<{
//     email: string,
//     username: string,
//     phoneNumber: string,
//     password: string,
//     checkPassword: string,
//     birth: string,
//   }>>
// }

// export default function SignupInput({
//   email,
//   formType,
//   label,
//   name,
//   isShort = false,
//   type,
//   placeholder,
//   value,
//   onChange,
//   setValidation,
//   validations,
// }: Iprops) {

//   const inputValidator = (e:React.FocusEvent<HTMLInputElement>,name: string) => {
//     if (name === "email") {
//       if (checkEmail(e.target.value)) {
//         setValidation({

//         })
//       }
//     }
//   }

//   return (
//     <SignupInputBox>
//       <SignupLabel htmlFor={name}>{label}</SignupLabel>
//       <CommonInput
//         id={name}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         value={formType === "moreinfo" && name === "email" ? email : value}
//         onChange={onChange}
//         isShort={isShort}
//         disabled={formType === "moreinfo"}
//         onBlur={(e) => inputValidator(e, name)}
//       />
//       <SignupLabelBox>
//         {Object.entries(validations).map(([key, value]) => (
//           <Label status={value ? value : ""}>{key}</Label>
//         ))}
//       </SignupLabelBox>
//     </SignupInputBox>
//   );
// }
