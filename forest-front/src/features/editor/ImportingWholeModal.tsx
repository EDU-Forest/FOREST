import { useDispatch } from "react-redux";
import {
  ImportingModalInsideLine,
  ImportingModalWrapper,
  PdfViewerXmark,
} from "./ImportingModal.style";
import { HiXMark } from "react-icons/hi2";
import FileInput from "@/components/Input/FileInput";
import { closeWholePdfModal } from "@/stores/editor/editorModal";
import { useState } from "react";
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

export default function ImportingWholeModal() {
  const { curWorkbookId } = useSelector((state: RootState) => state.editorWorkbook);
  const dispatch = useDispatch();
  const { mutate } = usePdfOCR();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [targetFile, setTargetFile] = useState<File>();

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //파일 업로드
    if (e.target.files) {
      setTargetFile(e.target.files[0]);
      setIsSuccess(true);
      const fileName = e.target.files[0].name;
      console.log(e.target.files[0]);
    }
  };

  const completeSelection = () => {
    if (targetFile) {
      let formData = new FormData();
      formData.append("file", targetFile as File);
      console.log("dlrp Wld", formData.get("file"));
      const payload = {
        curWorkbookId,
        file: formData,
      };
      mutate(payload);
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
    </ImportingModalWrapper>
  );
}
