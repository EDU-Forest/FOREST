import useWorkbookDetailPublicPatch from "@/apis/workbookDetail/useWorkbookDetailPublicPatch";
import { StyledToggleBtn, StyledToggleCircleBtn } from "./WorkbookDetail.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
// git conflict
// import { useDispatch } from "react-redux";
// import { StyledToggleBtn, StyledToggleCircleBtn } from "./WorkbookDetail.style";
// import { setIsPublic } from "@/stores/workbookDetail/workbookDetail";
// import useIsPublicWorkbook from "@/apis/workbookDetail/useIsPublicWorkbookQuery";
// import { useRouter } from "next/router";

interface IProps {
  isPublic: boolean;
  setIsPublic: any;
}

function Toggle({ isPublic, setIsPublic }: IProps) {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const { data, mutate: publicApi } = useWorkbookDetailPublicPatch();

  const handleClickToggle = () => {
    publicApi(workbook.workbookId);

    // git conflict
    // function Toggle({ isPublic }: IProps) {
    //   const dispatch = useDispatch();
    //   const router = useRouter();
    //   const wId = router.query.wId;
    //   const { mutate } = useIsPublicWorkbook();
    //   const handleClickToggle = () => {
    //     dispatch(setIsPublic());
    //     mutate(typeof wId === "string" ? parseInt(wId) : -1);
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
