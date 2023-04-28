import { StyledToggleBtn, StyledToggleCircleBtn } from "./WorkbookDetail.style";

interface IProps {
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toggle({ isPublic, setIsPublic }: IProps) {
  const handleClickToggle = () => {
    setIsPublic(!isPublic);
  };

  return (
    <StyledToggleBtn onClick={handleClickToggle}>
      <StyledToggleCircleBtn isPublic={isPublic} />
    </StyledToggleBtn>
  );
}

export default Toggle;
