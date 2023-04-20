import styled from "styled-components";

const StyledCommonInput = styled.input`
  width: 15rem;
  font-weight: 400;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.Gray[500]};
  padding: 0.5rem 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.Lime[500]};
  }
`;

interface Iprops {
  placeholder: string;
  inputText: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  // onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export default function CommonInput({ placeholder, inputText, onChange }: Iprops) {
  return <StyledCommonInput placeholder={placeholder} value={inputText} onChange={onChange} />;
}
