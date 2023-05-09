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
import WorkbookPdfSave from "@/features/workbookDetail/WorkbookPdfSave";
import WorkbookSelectClassModal from "@/features/workbookDetail/WorkbookSelectClassModal";
import WorkbookSettingModal from "@/features/workbookDetail/WorkbookSettingModal";
import { RootState } from "@/stores/store";
import { resetIsMoveToEditor } from "@/stores/workbookDetail/workbookDetail";
import { QuestionSummType, QuestionType } from "@/types/Workbook";
import withAuth from "@/utils/auth/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// 서버사이드에서 쿼리값을 넘겨서 새로고침 시 쿼리값 증발 방지
export async function getServerSideProps({ params: { wId } }: { params: { wId: string } }) {
  return {
    props: {},
  };
}

function WorkbookDetail() {
  const router = useRouter();
  const wId = router.query.wId;
  const dispatch = useDispatch();

  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const { questions } = useSelector((state: RootState) => state.editQuestions);

  const { isSuccess } = useWorkbookDetailQuery(Number(wId));

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
  const [isSavePdf, setIsSavePdf] = useState(false);

  const getQuestionSummary = (): QuestionSummType[] => {
    return questions.map((question: QuestionType) => {
      return { id: question?.problemId, title: question?.title };
    });
  };

  const getCurQuestionIdx = (): number => {
    return questions.findIndex((question) => question.problemId === curQuestion);
  };

  useEffect(() => {
    dispatch(resetIsMoveToEditor);
  }, []);

  useEffect(() => {
    getCurQuestionIdx();
  }, [curQuestion]);

  useEffect(() => {
    setQuestionSummary(getQuestionSummary);

    // questions가 초기화된 후에 curQuestion 지정
    // 1) questions가 빈 배열이 아닌데 0번이 현재 문제로 지정되어 있다면 1번 문제로 수정
    // 2) 새로운 questions가 아니라, 이전 questions로 연산되는 것을 방지하고자, questions 응답이 성공했을 때만 수행
    if (curQuestion === 0 && questions.length !== 0 && isSuccess) {
      setCurQuestion(questions[0].problemId);
    }
  }, [questions]);

  return (
    <div>
      <StyledWorkbookDetailBox>
        <WorkbookSideReturn />
        <WorkbookDetailQuestionOverviewAndContentBox>
          <WorkbookDetailInfoOverview
            id={workbook?.workbookId}
            cover={workbook?.workbookImgPath}
            likeCnt={workbook?.bookmarkCount}
            usedCnt={workbook?.scrapCount}
          />
          <WorkbookDetailQuestion
            isOriginal={workbook?.isOriginal}
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
            isSavePdf={isSavePdf}
            setIsSavePdf={setIsSavePdf}
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
      {isSavePdf && <WorkbookPdfSave setIsSavePdf={setIsSavePdf} />}
    </div>
  );
}

export default withAuth(WorkbookDetail);
