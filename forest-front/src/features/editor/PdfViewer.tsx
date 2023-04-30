import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

export default function PdfViewer() {
  const [pdfFile, setPdfFile] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const fileType = ["application/pdf"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files;
    console.log(targetFile);
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
  };
  return (
    <>
      <input type="file" onChange={handleChange} />
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{ workerSrc: "/pdf.worker.js" }}
      >
        <Page height={500} pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
        Previous
      </button>
      <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>
        Next
      </button>
    </>
  );
}
