import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ImgCropper from "./ImgCropper";
import {
  PdfViewerBtnWrapper,
  PdfViewerPageController,
  PdfViewerWrapper,
} from "./ImportingModal.style";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import CommonBtn from "@/components/Button/CommonBtn";
import { setFinish } from "@/stores/editor/editorModal";
import { useDispatch } from "react-redux";

interface Iprops {
  targetFile: FileList | null;
}
export default function ImportingModalPdfViewer({ targetFile }: Iprops) {
  const dispatch = useDispatch();
  const [pdfFile, setPdfFile] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageImage, setPageImage] = useState<string>("");
  const [select, setSelect] = useState<boolean>(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const fileType = ["application/pdf"];

  useEffect(() => {
    if (targetFile) {
      if (targetFile && fileType.includes(targetFile[0].type)) {
        let reader = new FileReader();
        reader.readAsDataURL(targetFile[0]);
        reader.onload = (e) => {
          if (typeof e.target?.result === "string") {
            setPdfFile(e.target.result);
          }
        };
      }
    }
  }, []);

  const selectSection = () => {
    setSelect(!select);
    // pdfjs.getDocument(pdfFile).promise.then(pdfToImage);
    svgToImg();
  };

  // 캔버스를 이미지 URL로 변경
  const pdfToImage = async (pdf: any) => {
    const canvas = document.createElement("canvas");
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
    const imageData = canvas.toDataURL("image/jpeg");
    setPageImage(imageData);
  };

  const completeSelection = () => {
    //선택 완료
    dispatch(setFinish(true));
    console.log("ㅎㅎ");
  };

  const [imgSection, setImgSection] = useState<HTMLCollectionOf<Element>>();

  const svgToImg = async () => {
    // const svg = document.getElementsByTagName("svg");
    // const s = new XMLSerializer().serializeToString(document.getElementById("svg") as Node);
    // const encodedData = window.btoa(s);
    // const dataUrl = `data:image/svg+xml;base64,${encodedData}`;
    // console.log("dataUrl", dataUrl);

    const svg = document.querySelector("svg");
    const $svg = document.querySelectorAll("svg");
    console.log("하...///", svg);
    console.log(typeof $svg);
    // console.log();

    const idx = $svg.length;
    console.log(idx);
    const pdfSvg = $svg[idx - 1];
    console.log("이거,,,pdfSvg /// ", pdfSvg);
    const pdfSvgData = new XMLSerializer().serializeToString(pdfSvg);
    console.log("pdfSvgData ??? ", pdfSvgData);

    // const encodedData = window.btoa(unescape(encodeURIComponent(pdfSvgData)));
    const encodedData = window.btoa(encodeURI(pdfSvgData));
    const dd = window.atob(encodedData);
    console.log("dd", dd);

    console.log("encodedData", encodedData);
    const dataUrl = `data:image/svg+xml;base64,${encodedData}`;
    console.log("dataUrl", dataUrl);

    setPageImage(dataUrl);

    // const data = new XMLSerializer().serializeToString(pdfSvg);
    // if (svg) {
    //   const data = new XMLSerializer().serializeToString(svg);
    //   console.log("data ???", data);
    //   const encodedData = window.btoa(data);
    //   console.log("encode", encodedData);
    //   const dataUrl = `data:image/svg+xml;base64,${encodedData}`;
    //   console.log("dataUrl", dataUrl);
    //   setPageImage(dataUrl);
    // }
  };

  return (
    <>
      <PdfViewerPageController>
        <button disabled={pageNumber <= 1 || select} onClick={() => setPageNumber(pageNumber - 1)}>
          <AiFillCaretLeft />
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button
          disabled={pageNumber >= numPages || select}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <AiFillCaretRight />
        </button>
      </PdfViewerPageController>
      <PdfViewerWrapper>
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          // options={{ workerSrc: "/pdf.worker.js" }}
          renderMode={"svg"}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </PdfViewerWrapper>
      <PdfViewerBtnWrapper>
        <CommonBtn isYellowGreen onClick={selectSection}>
          영역 선택
        </CommonBtn>
        <CommonBtn colored disabled={!select} onClick={completeSelection}>
          선택 완료
        </CommonBtn>
      </PdfViewerBtnWrapper>
      {pageImage && <img src={pageImage} alt="" style={{ width: "200px", height: "200px" }} />}
      {/* {select && <ImgCropperTest imageData={imgSection} />} */}
      {select && <ImgCropper imageData={pageImage} />}
    </>
  );
}
