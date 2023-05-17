import { useDispatch } from "react-redux";
import {
  FinishLoading,
  ImportingModalInsideLine,
  ImportingModalWrapper,
  PdfViewerXmark,
} from "./ImportingModal.style";
import { HiXMark } from "react-icons/hi2";
import FileInput from "@/components/Input/FileInput";
import { closeWholePdfModal, setFinish } from "@/stores/editor/editorModal";
import { useEffect, useState } from "react";
import {
  StyledFileInput,
  StyledFileInputLabel,
  StyledFileSelectedName,
} from "@/components/Input/Input.style";
import { MdOutlineFileCopy } from "react-icons/md";
import CommonBtn from "@/components/Button/CommonBtn";
import usePdfOCR from "@/apis/editor/usePdfOCR";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import Loading from "@/components/Loading/Loading";

export default function ImportingWholeModal() {
  const { curWorkbookId } = useSelector((state: RootState) => state.editorWorkbook);
  const { isFinished } = useSelector((state: RootState) => state.editorModal);

  const dispatch = useDispatch();
  const { mutate } = usePdfOCR();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [targetFile, setTargetFile] = useState<File>();

  useEffect(() => {
    dispatch(setFinish(false));
  }, []);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //파일 업로드
    if (e.target.files) {
      setTargetFile(e.target.files[0]);
      setIsSuccess(true);
      const fileName = e.target.files[0].name;
    }
  };

  const completeSelection = () => {
    if (targetFile) {
      let formData = new FormData();
      formData.append("file", targetFile as File);
      const payload = {
        curWorkbookId,
        file: formData,
      };
      mutate(payload);
      dispatch(setFinish(true));
    }
  };

  return (
    <ImportingModalWrapper style={{ width: "30rem", height: "20rem" }}>
      <PdfViewerXmark onClick={() => dispatch(closeWholePdfModal())}>
        <HiXMark />
      </PdfViewerXmark>
      <ImportingModalInsideLine>
        {!isSuccess ? (
          <StyledFileInputLabel id="pdfInput" style={{ width: "14rem" }}>
            <MdOutlineFileCopy />
            PDF 선택
            <StyledFileInput id="pdfInput" onChange={uploadFile} type="file" accept=".pdf" />
          </StyledFileInputLabel>
        ) : (
          <StyledFileSelectedName>
            <label id="pdfInput">
              <MdOutlineFileCopy /> {targetFile && targetFile.name}
              <StyledFileInput
                id="pdfInput"
                onChange={uploadFile}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
              />
            </label>
            <CommonBtn colored onClick={completeSelection}>
              선택 완료
            </CommonBtn>
          </StyledFileSelectedName>
        )}
      </ImportingModalInsideLine>
      {isFinished && (
        <FinishLoading>
          <Loading width={12} height={12} />
        </FinishLoading>
      )}
    </ImportingModalWrapper>
  );
}
