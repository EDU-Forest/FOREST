import useWorkbookDetailPublicPatch from "@/apis/workbookDetail/useWorkbookDetailPublicPatch";
import { StyledToggleBtn, StyledToggleCircleBtn } from "./WorkbookDetail.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useEffect } from "react";

interface IProps {
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

function Toggle({ isPublic, setIsPublic }: IProps) {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const { data, mutate: publicApi } = useWorkbookDetailPublicPatch();

  const handleClickToggle = () => {
    publicApi(workbook.workbookId);
  };

  useEffect(() => {
    if (data?.code === 204) {
      setIsPublic(!isPublic);
    }
  }, [data]);

  return (
    <StyledToggleBtn onClick={handleClickToggle}>
      <StyledToggleCircleBtn isPublic={isPublic} />
    </StyledToggleBtn>
  );
}

export default Toggle;
