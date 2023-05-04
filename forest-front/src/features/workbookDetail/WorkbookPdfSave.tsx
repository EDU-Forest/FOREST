import { QuestionType } from "@/types/Workbook";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { useEffect } from "react";
import {
  StyledQuestionChoiceNumBox,
  StyledQuestionDetailChoiceBox,
  StyledQuestionDetailChoiceListBox,
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
interface WorkbookType {
  id: number;
  title: String;
  workbookImgPath: String;
  desc: String;
  isPublic: Boolean;
  bookmarkCount: number;
  scrapCount: number;
  problemCount: number;
}

function WorkbookPdfSave({ setIsSavePdf }: IProps) {
  const workbook: WorkbookType = {
    id: 1,
    title: "수능 100제",
    workbookImgPath: "",
    desc: `ENGLISH 평가문제집 설명글`,
    // desc: `ENGLISH 평가문제집 설명글입니다.
    // 설명글은 글자 제한이 있어야할 것 같습니다.
    // 현재 화면 기준으로`,
    isPublic: true,
    bookmarkCount: 12,
    scrapCount: 1,
    problemCount: 4,
  };

  let questions: QuestionType[] = [
    {
      id: 1,
      problemNum: 1,
      type: "객관식",
      title: "다음 글의 제목으로 가장 적절한 것을 고르시오",
      text: `It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.`,
      point: 10,
      answer: "",
      problemImgPath: "",
      imgIsEmpty: false,
      textIsEmpty: false,
      items: [
        {
          id: 1,
          no: 1,
          content: "컨텐트",
          isImage: true,
        },
        {
          id: 1,
          no: 2,
          content: "컨텐트",
          isImage: false,
        },
        {
          id: 1,
          no: 3,
          content: "컨텐트",
          isImage: false,
        },
        {
          id: 1,
          no: 4,
          content: "컨텐트",
          isImage: false,
        },
      ],
    },
    {
      id: 1,
      problemNum: 1,
      type: "객관식",
      title: "다음 글의 제목으로 가장 적절한 것을 고르시오",
      text: `It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.`,
      point: 10,
      answer: "",
      problemImgPath: "",
      imgIsEmpty: false,
      textIsEmpty: false,
      items: [
        {
          id: 1,
          no: 1,
          content: "컨텐트",
          isImage: true,
        },
        {
          id: 1,
          no: 2,
          content: "컨텐트",
          isImage: false,
        },
        {
          id: 1,
          no: 3,
          content: "컨텐트",
          isImage: false,
        },
        {
          id: 1,
          no: 4,
          content: "컨텐트",
          isImage: false,
        },
      ],
    },
    {
      id: 1,
      problemNum: 1,
      type: "객관식",
      title: "다음 글의 제목으로 가장 적절한 것을 고르시오",
      text: `It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.`,
      point: 10,
      answer: "",
      problemImgPath: "",
      imgIsEmpty: false,
      textIsEmpty: false,
      items: [
        {
          id: 1,
          no: 1,
          content: "컨텐트",
          isImage: true,
        },
        {
          id: 1,
          no: 2,
          content: "컨텐트",
          isImage: false,
        },
        {
          id: 1,
          no: 3,
          content: "컨텐트",
          isImage: false,
        },
        {
          id: 1,
          no: 4,
          content: "컨텐트",
          isImage: false,
        },
      ],
    },
  ];

  useEffect(() => {
    const savePdf = async () => {
      // pdf로 변환할 element의 렌더링을 캡쳐(이미지화)
      const ele: any = document.getElementById("workbook-pdf");
      const canvas = await html2canvas(ele);
      const imgData = canvas.toDataURL("image/png");

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

    savePdf();
    // pdf 저장 후 현재 컴포넌트를 렌더링 제외
    setIsSavePdf(false);
  }, []);

  return (
    <WorkBookPdfBox id="workbook-pdf">
      <WorkBookPdfHeaderBox>
        <p>{workbook.title}</p>
        <p>{workbook.problemCount} 문항</p>
      </WorkBookPdfHeaderBox>
      <WorkBookPdfBoxQuestionsBox>
        {questions.map((question, i) => (
          <div>
            <StyledQuestionDetailTitleBox>
              <StyledQuestionDetailNumBox>{i + 1}</StyledQuestionDetailNumBox>
              <span>{question?.title}</span>
            </StyledQuestionDetailTitleBox>

            {/* 지문이 있다면 지문 렌더링 */}
            {question.text && (
              <StyledQuestionDetailTextBox>{question.text}</StyledQuestionDetailTextBox>
            )}

            {/* 객관식 보기 */}
            <StyledQuestionDetailChoiceListBox>
              {question.itemList.map((item) => {
                return (
                  <StyledQuestionDetailChoiceBox>
                    <StyledQuestionChoiceNumBox>{item.no}</StyledQuestionChoiceNumBox>
                    <span>{item.content}</span>
                  </StyledQuestionDetailChoiceBox>
                );
              })}
            </StyledQuestionDetailChoiceListBox>
          </div>
        ))}
      </WorkBookPdfBoxQuestionsBox>
    </WorkBookPdfBox>
  );
}

export default WorkbookPdfSave;
