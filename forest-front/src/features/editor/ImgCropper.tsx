import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
// import "./Demo.css";

interface Iprops {
  imageData: string;
}

export default function ImgCropper({ imageData }: Iprops) {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef<ReactCropperElement>();

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <div style={{ width: "50%" }}>
        {/* <input type="file" onChange={onChange} /> */}
        <br />
        <br />
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          // preview=".img-preview"
          src={imageData}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          // guides={true}
        ></Cropper>
      </div>
      <div>
        {/* <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div className="img-preview" style={{ width: "100%", float: "left", height: "300px" }} />
        </div> */}
        <div className="box" style={{ width: "50%", float: "right", height: "300px" }}>
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>
      </div>
      {/* <br style={{ clear: "both" }} /> */}
    </div>
  );
}
