import CommonBtn from "@/components/Button/CommonBtn";
import ImgCropper from "./ImgCropper";
import { ImgViewerBtnWrapper } from "./ImportingModal.style";
import { useState } from "react";

interface Iprops {
  imgUrl: string;
}

export default function ImportingModalImgViewer({ imgUrl }: Iprops) {
  const [finish, setFinish] = useState<boolean>(false);
  const completeSelection = () => {
    //선택 완료
    setFinish(true);
  };
  return (
    <>
      <ImgCropper imageData={imgUrl} isfinish={finish} />
      <ImgViewerBtnWrapper>
        <CommonBtn colored onClick={completeSelection}>
          선택 완료
        </CommonBtn>
      </ImgViewerBtnWrapper>
    </>
  );
}
