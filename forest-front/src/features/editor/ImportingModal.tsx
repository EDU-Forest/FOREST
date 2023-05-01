import { useState } from "react";
import { ImportingModalInsideLine, ImportingModalWrapper } from "./ImportingModal.style";
import FileInput from "@/components/Input/FileInput";
import ImportingModalPdfViewer from "./ImportingModalPdfViewer";

export default function ImportingModal() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [targetFile, setTargetFile] = useState<FileList | null>(null);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //파일 업로드
    setTargetFile(e.target.files);
    setIsSuccess(true);
  };
  return (
    <ImportingModalWrapper>
      {!isSuccess ? (
        <ImportingModalInsideLine>
          <FileInput onChange={uploadFile} />
        </ImportingModalInsideLine>
      ) : (
        <ImportingModalPdfViewer targetFile={targetFile} />
      )}
    </ImportingModalWrapper>
  );
}
