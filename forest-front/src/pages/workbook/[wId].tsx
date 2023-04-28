import {
  StyledWorkbookDetailBox,
  WorkbookDetailQuestionBtnAndVisibilityBox,
  WorkbookDetailQuestionOverviewAndContentBox,
} from "@/features/workbookDetail/WorkbookDetail.style";
import WorkbookDetailBtns from "@/features/workbookDetail/WorkbookDetailBtns";
import WorkbookDetailInfoOverview from "@/features/workbookDetail/WorkbookDetailInfoOverview";
import WorkbookDetailQuestion from "@/features/workbookDetail/WorkbookDetailQuestion";
import WorkbookDetailQuestionList from "@/features/workbookDetail/WorkbookDetailQuestionList";
import WorkbookSideReturn from "@/features/workbookDetail/WorkbookDetailSideReturn";
import WorkbookExportModal from "@/features/workbookDetail/WorkbookExportModal";
import WorkbookSelectClassModal from "@/features/workbookDetail/WorkbookSelectClassModal";
import { QuestionSummType, QuestionType } from "@/types/Workbook";
import { useState } from "react";

// 서버사이드에서 쿼리값을 넘겨서 새로고침 시 쿼리값 증발 방지
export async function getServerSideProps({ params: { wId } }: { params: { wId: string } }) {
  return {
    props: {},
  };
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

function WorkbookDetail() {
  // 더미
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
      image: "이미지",
      items: [
        {
          id: 1,
          no: 1,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 2,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 3,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 4,
          content: "컨텐트",
          path: "",
        },
      ],
    },
    {
      id: 2,
      problemNum: 2,
      type: "객관식",
      title: "2번 문항",
      text: "지문",
      point: 10,
      image: "이미지",
      items: [
        {
          id: 1,
          no: 1,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 2,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 3,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 4,
          content: "컨텐트",
          path: "",
        },
      ],
    },
    {
      id: 3,
      problemNum: 3,
      type: "객관식",
      title: "3번 문항",
      text: "지문",
      point: 10,
      image: "이미지",
      items: [
        {
          id: 1,
          no: 1,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 2,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 3,
          content: "컨텐트",
          path: "",
        },
        {
          id: 1,
          no: 4,
          content: "컨텐트",
          path: "",
        },
      ],
    },
  ];

  // 현재 문제
  // 문제집 내에 문제가 없는 경우에는 첫 문제를 세팅
  const [curQuestion, setCurQuestion] = useState(questions.length === 0 ? 0 : questions[0].id);
  // modal open/close
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSelectClassOpen, setIsSelectClassOpen] = useState(false);

  const getQuestionSummary = (): QuestionSummType[] => {
    return questions.map((question) => {
      return { id: question?.id, title: question?.title };
    });
  };

  const [questionSummary, setQuestionSummary] = useState(getQuestionSummary());

  return (
    <StyledWorkbookDetailBox>
      <WorkbookSideReturn />
      <WorkbookDetailQuestionOverviewAndContentBox>
        <WorkbookDetailInfoOverview
          id={workbook?.id}
          cover={workbook?.workbookImgPath}
          title={workbook?.title}
          desc={workbook?.desc}
          likeCnt={workbook?.bookmarkCount}
          usedCnt={workbook?.scrapCount}
        />
        <WorkbookDetailQuestion
          question={questions[curQuestion - 1]} /* 현재 선택된 문제 */
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
          questionSumm={questionSummary}
        />
      </WorkbookDetailQuestionOverviewAndContentBox>
      <WorkbookDetailQuestionBtnAndVisibilityBox>
        <WorkbookDetailBtns setIsExportOpen={setIsExportOpen} />
        <WorkbookDetailQuestionList
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
          questionCnt={questions.length}
          questionSumm={questionSummary}
          setQuestionSum={setQuestionSummary}
        />
      </WorkbookDetailQuestionBtnAndVisibilityBox>

      {/* 내보내기 모달 */}
      {isExportOpen && <WorkbookExportModal setIsOpen={setIsExportOpen} setIsSelectClassOpen={setIsSelectClassOpen}/>}
      {/* 내보내기 모달 */}
      {isSelectClassOpen && <WorkbookSelectClassModal setIsOpen={setIsSelectClassOpen} />}
    </StyledWorkbookDetailBox>
  );
}

export default WorkbookDetail;
