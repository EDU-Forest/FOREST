import QuestionChoiceList from "@/components/Question/QuestionChoiceList";
import { RootState } from "@/stores/store";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StyledQuestionDetailNumBox,
  StyledQuestionDetailTextBox,
  StyledQuestionDetailTitleBox,
  WorkBookPdfBox,
  WorkBookPdfBoxQuestionsBox,
  WorkBookPdfHeaderBox,
} from "./WorkbookDetail.style";

interface IProps {
  setIsSavePdf: React.Dispatch<React.SetStateAction<boolean>>;
}

function WorkbookPdfSave({ setIsSavePdf }: IProps) {
  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);

  useEffect(() => {
    const savePdf = async () => {
      // pdf로 변환할 element의 렌더링을 캡쳐(이미지화)
      const ele: any = document.getElementById("workbook-pdf");
      const canvas = await html2canvas(ele);
      const imgData = canvas.toDataURL("image/png");

      console.log(canvas);

      // pdf 크기: A4 기준으로 세팅
      const imgWidth = 210;
      const pageHeight = imgWidth * 1.414;
      // 이미지 크기
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // 한 페이지에 삽입하고 남은 이미지 세로 영역
      let heightLeft = imgHeight;

      // pdf 객체
      const doc = new jspdf("p", "mm", "a4", true);
      //   const pageWidth = doc.internal.pageSize.getWidth();
      //   const pageHeight = doc.internal.pageSize.getHeight();
      let position = 0;

      // pdf에 이미지 삽입
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");

      // 한 페이지에 삽입 후 남은 영역 계산
      heightLeft -= pageHeight;

      // 이미지를 남김 없이 삽입할 때까지 한 페이지에 삽입 반복
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        // 새 페이지 추가하고 이미지 삽입
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        // 한 페이지에 삽입 후 남은 영역 계산
        heightLeft -= pageHeight;
      }

      // pdf 파일로 다운로드
      doc.save(`${workbook.title}`);
    };

    // savePdf();
    // pdf 저장 후 현재 컴포넌트를 렌더링 제외
    // setIsSavePdf(false);
  }, []);

  const [img, setImg] = useState("");

  function toDataURL(url: string, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  toDataURL(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/140px-Unofficial_JavaScript_logo_2.svg.png",
    function (dataUrl: string) {
      // console.log("RESULT:", dataUrl);
    },
  );

  const test = (url: string): boolean => {
    console.log("여기", url);

    toDataURL(url, function (dataUrl: string) {
      console.log("RESULT:", dataUrl);
    });

    return true;
  };

  return (
    <WorkBookPdfBox id="workbook-pdf">
      <WorkBookPdfHeaderBox>
        <p>{workbook.title}</p>
        <p>{workbook.volume} 문항</p>
      </WorkBookPdfHeaderBox>
      <WorkBookPdfBoxQuestionsBox>
        {questions.map((question, i) => (
          <div key={`question-${i}`}>
            {/* 문항이 존재할 경우에만 렌더링 */}
            {question && (
              <StyledQuestionDetailTitleBox>
                <StyledQuestionDetailNumBox>{i + 1}</StyledQuestionDetailNumBox>
                <span>{question?.title}</span>
              </StyledQuestionDetailTitleBox>
            )}
            {/* 지문이 있다면 지문 렌더링 */}
            {question?.text && (
              <StyledQuestionDetailTextBox>{question?.text}</StyledQuestionDetailTextBox>
            )}
            {/* 이미지가 있다면 이미지 렌더링 */}
            {question?.problemImgPath && test(question?.problemImgPath) && (
              <img src={question?.problemImgPath} alt="question" />
            )}
            {/* {question?.problemImgPath && <img src={question?.problemImgPath} alt="question" />} */}

            {/* 객관식 보기 */}
            {question?.type === "MULTIPLE" && question.itemList && (
              <QuestionChoiceList items={question?.itemList} />
            )}
          </div>
        ))}
      </WorkBookPdfBoxQuestionsBox>
    </WorkBookPdfBox>
  );
}

export default WorkbookPdfSave;
