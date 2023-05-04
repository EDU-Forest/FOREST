import useWorkbookDetailQuery from "@/apis/workbookDetail/useWorkbookDetailQuery";
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
import WorkbookSettingModal from "@/features/workbookDetail/WorkbookSettingModal";
import { RootState } from "@/stores/store";
import { QuestionSummType, QuestionType } from "@/types/Workbook";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// 서버사이드에서 쿼리값을 넘겨서 새로고침 시 쿼리값 증발 방지
export async function getServerSideProps({ params: { wId } }: { params: { wId: string } }) {
  return {
    props: {},
  };
}

function WorkbookDetail() {
  const router = useRouter();
  const wId = router.query.wId;

  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const { questions } = useSelector((state: RootState) => state.editQuestions);

  const {
    // data: { workbookInfoDto: workbook } = { workbookInfoDto: [] },
    // data: { problemList: questions } = { problemList: [] },
  } = useWorkbookDetailQuery(Number(wId));

  // 현재 문제
  // 문제집 내에 문제가 없는 경우에는 첫 문제를 세팅
  const [curQuestion, setCurQuestion] = useState(0);
  const [questionSummary, setQuestionSummary]: any = useState([]);
  // modal open/close
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSelectClassOpen, setIsSelectClassOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  // 선택한 출제 클래스
  const [selectedClass, setSelectedClass] = useState<number[]>([]);

  const getQuestionSummary = (): QuestionSummType[] => {
    return questions.map((question: QuestionType) => {
      return { id: question?.problemId, title: question?.title };
    });
  };

  const getCurQuestionIdx = (): number => {
    return questions.findIndex((question) => question.problemId === curQuestion);
  };

  useEffect(() => {
    getCurQuestionIdx();
  }, [curQuestion]);

  useEffect(() => {
    setQuestionSummary(getQuestionSummary);

    // questions가 초기화된 후에 curQuestion 지정
    // questions가 빈 배열이 아닌데 0번이 현재 문제로 지정되어 있다면 1번 문제로 수정
    if (curQuestion === 0 && questions.length !== 0) {
      setCurQuestion(questions[0].problemId);
    }
  }, [questions]);

  return (
    <StyledWorkbookDetailBox>
      <WorkbookSideReturn />
      <WorkbookDetailQuestionOverviewAndContentBox>
        <WorkbookDetailInfoOverview
          id={workbook?.workbookId}
          cover={workbook?.workbookImgPath}
          title={workbook?.title}
          desc={workbook?.description}
          likeCnt={workbook?.bookmarkCount}
          usedCnt={workbook?.scrapCount}
        />
        <WorkbookDetailQuestion
          isOriginal={workbook.isOriginal}
          question={questions[getCurQuestionIdx()]} /* 현재 선택된 문제 */
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
          questionSumm={questionSummary}
        />
      </WorkbookDetailQuestionOverviewAndContentBox>
      <WorkbookDetailQuestionBtnAndVisibilityBox>
        <WorkbookDetailBtns setIsExportOpen={setIsExportOpen} questionSummary={questionSummary} />
        <WorkbookDetailQuestionList
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
          questionCnt={questions.length}
          questionSumm={questionSummary}
          setQuestionSum={setQuestionSummary}
        />
      </WorkbookDetailQuestionBtnAndVisibilityBox>

      {/* 내보내기 모달 */}
      {isExportOpen && (
        <WorkbookExportModal
          setIsOpen={setIsExportOpen}
          setIsSelectClassOpen={setIsSelectClassOpen}
        />
      )}
      {/* 내보내기 모달 */}
      {isSelectClassOpen && (
        <WorkbookSelectClassModal
          setIsOpen={setIsSelectClassOpen}
          setIsSettingOpen={setIsSettingOpen}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      )}
      {/* 출제 세팅 모달 */}
      {isSettingOpen && (
        <WorkbookSettingModal
          setIsOpen={setIsSettingOpen}
          selectedClass={selectedClass}
          title={workbook.title}
        />
      )}
    </StyledWorkbookDetailBox>
  );
}

export default WorkbookDetail;
