import useStudentDetailResultQuery from "@/apis/study/useStudentDetailResultQuery";
import useStudentQuestionResultQuery from "@/apis/study/useStudentQuestionResultQuery";
import Loading from "@/components/Loading/Loading";

import {
  StyledTestHeader,
  StyledTestHeaderContentBox,
  StyledTestHeaderText,
  StyledTestHeaderTitle,
} from "@/features/test/index/TextIndex.style";

import TestResultTotalContentDetail from "@/features/test/result/TestResultTotalContentDetail";
import TestResultTotalContentGraph from "@/features/test/result/TestResultTotalContentGraph";
import {
  ResultContainer,
  TestResultContentBox,
  TestResultOkBtn,
  TestResultQuestionBox,
  TestResultQuestionBtn,
  TestResultSectionBox,
  TestResultTitleBox,
  TestResultTotalBox,
  TestResultTotalContentBox,
  TestResultTotalTitleBox,
} from "@/features/test/result/TextResult.style";
import { IStudentStudyProblemResultList } from "@/types/Study";
import { useRouter } from "next/router";

interface ServerProps {
  query: {
    studentStudyResultId: number;
    name: string;
    email: string;
    title: string;
  };
}

export default function StudyAnalysisEachStudentPage({
  studentStudyResultId,
  name,
  email,
  title,
}: ServerProps["query"]) {
  const router = useRouter();
  const studyId = router.query.id;

  const { data: detail, isLoading: detailLoadind } =
    useStudentDetailResultQuery(studentStudyResultId);
  const { data: problem, isLoading: problemLoading } =
    useStudentQuestionResultQuery(studentStudyResultId);

  const clickHandler = () => {
    router.push(`/teacher/class/study/${studyId}`);
  };

  return (
    <>
      <ResultContainer>
        <StyledTestHeader>
          <StyledTestHeaderContentBox>
            <img src={"/images/Forest_Logo.png"} className="logo-img" />

            <StyledTestHeaderTitle>{title}</StyledTestHeaderTitle>
          </StyledTestHeaderContentBox>
          <StyledTestHeaderContentBox>
            <StyledTestHeaderText>총 {detail?.volume}문항</StyledTestHeaderText>
          </StyledTestHeaderContentBox>
        </StyledTestHeader>

        <TestResultSectionBox>
          <TestResultQuestionBox
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TestResultTotalTitleBox style={{ display: "inline-block", marginBottom: "0" }}>
              응시자
            </TestResultTotalTitleBox>
            <div>
              {name}
              <span style={{ fontSize: "14px", color: "#ADB5BD", marginLeft: "1.5rem" }}>
                {email}
              </span>
            </div>
          </TestResultQuestionBox>
          <TestResultTotalBox>
            <TestResultTotalTitleBox>시험 결과</TestResultTotalTitleBox>
            {detailLoadind ? (
              <Loading width={10} height={10} />
            ) : (
              <TestResultTotalContentBox>
                <TestResultTotalContentDetail studyResult={detail} />
                <img src={"/images/Test_Result_Total_Content_Arrow.png"} className="icon" />
                <TestResultTotalContentGraph
                  volume={detail?.volume}
                  correctNum={detail?.correctNum}
                />
              </TestResultTotalContentBox>
            )}
          </TestResultTotalBox>
          <TestResultQuestionBox>
            <TestResultTitleBox>문항별 정답 여부</TestResultTitleBox>
            {problemLoading ? (
              <Loading width={10} height={10} />
            ) : (
              <TestResultContentBox>
                {problem?.studentStudyProblemResultList.map(
                  (item: IStudentStudyProblemResultList) => (
                    <TestResultQuestionBtn
                      userRole="teacher"
                      key={item.problemNum}
                      isCorrect={item.isCorrected}
                    >
                      {item.problemNum}
                    </TestResultQuestionBtn>
                  ),
                )}
              </TestResultContentBox>
            )}
          </TestResultQuestionBox>
          <TestResultOkBtn onClick={clickHandler}>확인</TestResultOkBtn>
        </TestResultSectionBox>
      </ResultContainer>
    </>
  );
}

export const getServerSideProps = async ({
  query: { studentStudyResultId, name, email, title },
}: ServerProps) => {
  return {
    props: {
      studentStudyResultId,
      name,
      email,
      title,
    },
  };
};
