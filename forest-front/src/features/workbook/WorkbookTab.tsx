import { StyledWorkbookTab, StyledWorkbookTabItem } from "./Workbook.style";

interface IProps {
  selectedType: string;
  // setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedType: (selectedType: string) => void;
}

function WorkbookTab({ selectedType, setSelectedType }: IProps) {
  const handleClickTapItem = (type: string) => {
    setSelectedType(type);
  };

  return (
    <StyledWorkbookTab>
      <StyledWorkbookTabItem
        onClick={() => handleClickTapItem("like")}
        isSelected={selectedType === "like" ? true : false}
      >
        좋아하는 문제집
      </StyledWorkbookTabItem>
      <StyledWorkbookTabItem
        onClick={() => handleClickTapItem("use")}
        isSelected={selectedType === "use" ? true : false}
      >
        사용한 문제집
      </StyledWorkbookTabItem>
      <StyledWorkbookTabItem
        onClick={() => handleClickTapItem("own")}
        isSelected={selectedType === "own" ? true : false}
      >
        내가 만든 문제집
      </StyledWorkbookTabItem>
    </StyledWorkbookTab>
  );
}

export default WorkbookTab;
