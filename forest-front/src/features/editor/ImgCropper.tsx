import React, { useState, createRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FinishLoading, ImgCropperWrapper } from "./ImportingModal.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { closePartPdfModal } from "@/stores/editor/editorModal";
import Loading from "@/components/Loading/Loading";

interface Iprops {
  imageData: string;
  // completeSelection: () => void;
}

export default function ImgCropper({ imageData }: Iprops) {
  const dispatch = useDispatch();
  const { isFinished } = useSelector((state: RootState) => state.editorModal);
  // const [image, setImage] = useState("");
  // const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();

  useEffect(() => {
    if (isFinished) {
      getCropData();

      setTimeout(() => {
        dispatch(closePartPdfModal());
      }, 3000);
    }
  }, [isFinished]);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();
        formData.append("img", blob as Blob);
        console.log(formData.get("img"));
      });
      console.log("된당");
      // 요기서 요청해야함!!!!!
    }
  };
  console.log(isFinished);

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
