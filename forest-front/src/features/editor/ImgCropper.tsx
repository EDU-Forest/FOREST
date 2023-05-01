import React, { useState, createRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ImgCropperWrapper } from "./ImportingModal.style";

interface Iprops {
  imageData: string;
  isfinish: boolean;
}

export default function ImgCropper({ imageData, isfinish }: Iprops) {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();

  useEffect(() => {
    if (isfinish) {
      getCropData();
    }
  }, [isfinish]);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      console.log("된당");
    }
  };

  return (
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
  );
}
