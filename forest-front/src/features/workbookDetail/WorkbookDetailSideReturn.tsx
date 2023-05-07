import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { WorkbookDetailSideReturnBtnBox } from "./WorkbookDetail.style";

function WorkbookDetailSideReturn() {
  const router = useRouter();

  const pageReturn = () => {
    router.push("/workbook");
  };

  return (
    <WorkbookDetailSideReturnBtnBox onClick={pageReturn}>
      <AiOutlineArrowLeft />
    </WorkbookDetailSideReturnBtnBox>
  );
}

export default WorkbookDetailSideReturn;
