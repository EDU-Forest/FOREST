import { useEffect, useState } from "react";
import {
  ImportingModalInsideLine,
  ImportingModalWrapper,
  PdfViewerXmark,
} from "./ImportingModal.style";
import FileInput from "@/components/Input/FileInput";
import ImportingModalPdfViewer from "./ImportingModalPdfViewer";
import { useDispatch } from "react-redux";
import { HiXMark } from "react-icons/hi2";
import { closePartPdfModal, setFinish } from "@/stores/editor/editorModal";
import ImgCropper from "./ImgCropper";
import ImportingModalImgViewer from "./ImportingModalImgViewer";
import Loading from "@/components/Loading/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function ImportingPartModal() {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [targetFile, setTargetFile] = useState<FileList | null>(null);
  const [isPdf, setIsPdf] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    dispatch(setFinish(false));
  }, []);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //파일 업로드
    if (e.target.files) {
      setTargetFile(e.target.files);
      setIsSuccess(true);
      const fileName = e.target.files[0].name;
      const fileExtension = fileName.split(".").pop();

      if (fileExtension === "pdf") {
        setIsPdf(true);
      } else {
        setIsPdf(false);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
          if (typeof e.target?.result === "string") {
            setImgUrl(e.target.result);
          }
        };
      }
    }
  };

  return (
    <ImportingModalWrapper>
      <PdfViewerXmark onClick={() => dispatch(closePartPdfModal())}>
        <HiXMark />
      </PdfViewerXmark>

      {!isSuccess ? (
        <ImportingModalInsideLine>
          <FileInput onChange={uploadFile} text={"PDF 또는 이미지 불러오기"} />
        </ImportingModalInsideLine>
      ) : (
        <>
          {isPdf ? (
            <ImportingModalPdfViewer targetFile={targetFile} />
          ) : (
            <ImportingModalImgViewer imgUrl={imgUrl} />
          )}
        </>
      )}
    </ImportingModalWrapper>
  );
}
