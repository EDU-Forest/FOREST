import { StyledWorkbookDetailBox } from "@/features/workbookDetail/WorkbookDetail.style";
import WorkbookDetailBtns from "@/features/workbookDetail/WorkbookDetailBtns";
import WorkbookDetailInfoOverview from "@/features/workbookDetail/WorkbookDetailInfoOverview";
import WorkbookDetailQuestion from "@/features/workbookDetail/WorkbookDetailQuestion";
import WorkbookDetailQuestionList from "@/features/workbookDetail/WorkbookDetailQuestionList";
import WorkbookSideReturn from "@/features/workbookDetail/WorkbookDetailSideReturn";
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

interface QuestionType {
  id: number;
  problemNum: number;
  type: string;
  title: string;
  text: string;
  point: number;
  image: string;
  items: {
    id: number;
    no: number;
    content: string;
    path: string;
  }[];
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

  const questions: QuestionType[] = [
    {
      id: 1,
      problemNum: 1,
      type: "객관식",
      title: "제목",
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
      id: 2,
      problemNum: 2,
      type: "객관식",
      title: "제목",
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
      title: "제목",
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
  // 문제집 내에 문제가 없는 경우에는
  const [curQuestion, setCurQuestion] = useState(questions.length === 0 ? 0 : 1);

  const getQuestionSummary = (): object[] => {
    return questions.map((question) => {
      return { id: question?.id, title: question?.title };
    });
  };

  return (
    <StyledWorkbookDetailBox>
      <WorkbookSideReturn />
      <div>
        <WorkbookDetailInfoOverview
          id={workbook?.id}
          cover={workbook?.workbookImgPath}
          title={workbook?.title}
          desc={workbook?.desc}
          likeCnt={workbook?.bookmarkCount}
          usedCnt={workbook?.scrapCount}
        />
        <WorkbookDetailQuestion />
      </div>
      <div>
        <WorkbookDetailBtns />
        <WorkbookDetailQuestionList
          questionCnt={workbook?.problemCount}
          questionSumm={getQuestionSummary()}
        />
      </div>
    </StyledWorkbookDetailBox>
  );
}

export default WorkbookDetail;
