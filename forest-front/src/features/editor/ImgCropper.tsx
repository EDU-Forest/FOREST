import React, { useState, createRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FinishLoading, ImgCropperWrapper } from "./ImportingModal.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { closePartPdfModal } from "@/stores/editor/editorModal";
import Loading from "@/components/Loading/Loading";
import useImgOCR from "@/apis/editor/useImgOCR";

interface Iprops {
  imageData: string;
}

export default function ImgCropper({ imageData }: Iprops) {
  const dispatch = useDispatch();
  const { mutate } = useImgOCR();
  const { curWorkbookId } = useSelector((state: RootState) => state.editorWorkbook);
  const { isFinished } = useSelector((state: RootState) => state.editorModal);
  const cropperRef = createRef<ReactCropperElement>();

  useEffect(() => {
    if (isFinished) {
      getCropData();
    }
  }, [isFinished]);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();
        formData.append("file", blob as Blob);

        const payload = {
          curWorkbookId,
          file: formData,
        };

        mutate(payload);
      });
    }
  };

  return (
    <>
      <ImgCropperWrapper>
        <Cropper
          ref={cropperRef}
          zoomTo={0.5}
          initialAspectRatio={1}
          src={imageData}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      </ImgCropperWrapper>
      {isFinished && (
        <FinishLoading>
          <Loading width={12} height={12} />
        </FinishLoading>
      )}
    </>
  );
}
