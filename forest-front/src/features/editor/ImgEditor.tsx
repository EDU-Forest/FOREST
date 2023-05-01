import { useRef } from "react";
// import ImageEditor from "tui-image-editor";
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

export default function ImgEditor() {
  const editor = document.querySelector("#tui-image-editor") as HTMLInputElement;
  const instance = new ImageEditor(editor, {
    cssMaxWidth: 700,
    cssMaxHeight: 500,
    selectionStyle: {
      cornerSize: 20,
      rotatingPointOffset: 70,
    },
  });
  const imageEditor = useRef(null);

  return (
    <>
      <ImageEditor
        ref={imageEditor}
        includeUI={{
          loadImage: {
            path: "image.png",
            name: "SampleImage",
          },
          theme: {
            // 테마 설정
          },
          // 다른 설정들
        }}
        // 다른 설정들
      />
    </>
  );
}
