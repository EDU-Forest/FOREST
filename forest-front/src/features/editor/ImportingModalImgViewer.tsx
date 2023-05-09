import CommonBtn from "@/components/Button/CommonBtn";
import ImgCropper from "./ImgCropper";
import { ImgViewerBtnWrapper } from "./ImportingModal.style";
import { useDispatch } from "react-redux";
import { setFinish } from "@/stores/editor/editorModal";

interface Iprops {
  imgUrl: string;
}

export default function ImportingModalImgViewer({ imgUrl }: Iprops) {
  const dispatch = useDispatch();
  const completeSelection = () => {
    //선택 완료
    dispatch(setFinish(true));
  };
  return (
    <>
      <ImgCropper imageData={imgUrl} />
      <ImgViewerBtnWrapper>
        <CommonBtn colored onClick={completeSelection}>
          선택 완료
        </CommonBtn>
      </ImgViewerBtnWrapper>
    </>
  );
}
