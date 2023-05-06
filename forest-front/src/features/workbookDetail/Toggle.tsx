import { useDispatch } from "react-redux";
import { StyledToggleBtn, StyledToggleCircleBtn } from "./WorkbookDetail.style";
import { setIsPublic } from "@/stores/workbookDetail/workbookDetail";
import useIsPublicWorkbook from "@/apis/workbookDetail/useIsPublicWorkbookQuery";
import { useRouter } from "next/router";

interface IProps {
  isPublic: boolean;
}

function Toggle({ isPublic }: IProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const wId = router.query.wId;
  const { mutate } = useIsPublicWorkbook();
  const handleClickToggle = () => {
    dispatch(setIsPublic());
    mutate(typeof wId === "string" ? parseInt(wId) : -1);
  };

  return (
    <StyledToggleBtn onClick={handleClickToggle}>
      <StyledToggleCircleBtn isPublic={isPublic} />
    </StyledToggleBtn>
  );
}

export default Toggle;
