import useWorkbookDetailReleasePatch from "@/apis/workbookDetail/useWorkbookDetailReleasePatch";
import SmallBtn from "@/components/Button/SmallBtn";
import { RootState } from "@/stores/store";
import { ModalBtnsBox } from "@/styles/modal";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineFilePdf, AiOutlineShareAlt } from "react-icons/ai";
import { useSelector } from "react-redux";
import WorkbookExportRadioGroup from "./WorkbookExportRadioGroup";
import { NotOriginalParagraph, WorkbookExportModalBox } from "./WorkbookModal.style";
// import useIsOriginalWorkbook from "@/apis/workbookDetail/useIsOriginalWorkbookQuery";
// import { useRouter } from "next/router";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectClassOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSavePdf: boolean;
  setIsSavePdf: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ExportType {
  value: string;
  text: string;
  img: React.ReactElement<SetConstructor>;
  action: () => void;
}

function WorkbookExportModal({ isSavePdf, setIsSavePdf, setIsOpen, setIsSelectClassOpen }: IProps) {
  // const [isSavePdf, setIsSavePdf] = useState(false);
  const { data, mutate: releaseWorkbookApi } = useWorkbookDetailReleasePatch();
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const { isOriginal, isDeploy } = workbook;

  // const router = useRouter();
  // const wId = router.query.wId;

  // useIsOriginalWorkbook(typeof wId === "string" ? parseInt(wId) : -1);

  const chosenSet = () => {
    setIsOpen(false);
    setIsSelectClassOpen(true);
  };

  const chosenRelease = () => {
    releaseWorkbookApi(workbook.workbookId);
    if (data?.code === 204) {
      setIsOpen(false);
    }
  };

  const chosenPdf = async () => {
    setIsSavePdf(true);
    setIsOpen(false);
  };

  const exports: ExportType[] = [
    { value: "pdf", text: "PDF", img: <AiOutlineFilePdf />, action: chosenPdf },
    { value: "set", text: "출제", img: <AiOutlineEdit />, action: chosenSet },
    { value: "release", text: "배포", img: <AiOutlineShareAlt />, action: chosenRelease },
  ];

  const [value, setValue] = useState(exports[0].value);

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickChoose = () => {
    const chosenAction = exports.find((e) => e.value === value)?.action;
    // find는 찾은 요소가 없는 경우에는 undefined를 반환한다
    // 따라서 chosenAction의 타입은 undefined 일 수 있기 때문에, undefined가 아닌 경우에만 함수 실행
    chosenAction && chosenAction();
  };

  return (
    <>
      {/* pdf 저장하기 위해 isSavePdf가 true가 되면 렌더링 */}
      {/* 저장 직후 false되며 렌더링 사라짐 */}
      {/* {isSavePdf ? (
        <WorkbookPdfSave setIsSavePdf={setIsSavePdf} />
      ) : ( */}
      <WorkbookExportModalBox>
        <p>내보내기 방식을 선택해주세요.</p>
        {!isOriginal && (
          <NotOriginalParagraph>
            직접 제작한 문제집 외에는 PDF 기능만 사용 가능합니다.
          </NotOriginalParagraph>
        )}
        <WorkbookExportRadioGroup
          isDeploy={isDeploy}
          isOriginal={isOriginal}
          exports={exports}
          value={value}
          setValue={setValue}
        />
        <ModalBtnsBox>
          <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
          <SmallBtn onClick={handleClickChoose} colored={true}>
            선택
          </SmallBtn>
        </ModalBtnsBox>
      </WorkbookExportModalBox>
      {/* )} */}
    </>
  );
}

export default WorkbookExportModal;
