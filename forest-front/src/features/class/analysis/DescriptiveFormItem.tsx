import {
  DescriptiveFormUpperItem,
  DescriptiveFormUpperTitle,
  DescriptiveFormUpper,
  DescriptiveFormUpperBox,
  DescriptiveFormUpperScore,
} from "./DescriptiveForm.style";
import { AnalysisSubTitle } from "./StudyAnalysis.style";
import { ClassSummaryText, ClassSummaryTextWrapper } from "../ClassSummary.style";
import { AiOutlineRight } from "react-icons/ai";
import { StyledWorkbookStatus } from "@/components/Status/Status.style";

const dummy = {
  title:
    "이 문제는 영국에서 시작되어.... 싸피 어쩌고저쩌고 자율 프로젝트 너무 힘들어요오오오오오오 ㅏ아ㅏㅏㅏ... 오늘도 열심히 개발하자! ",
  keyword: ["리액트", "샤브샤브", "커피", "코딩", "집에보내줘", "하하", "졸려", "잠와"],
  score: 10,
};
export default function DescriptiveFormItem() {
  const goToProblem = () => {
    // 문제 보기
  };
  return (
    <DescriptiveFormUpper>
      <DescriptiveFormUpperBox className="item1">
        <ClassSummaryTextWrapper>
          <AnalysisSubTitle noMargin>문제 제목</AnalysisSubTitle>
          <ClassSummaryText
            isGray
            style={{ cursor: "pointer", margin: "0px" }}
            onClick={goToProblem}
          >
            문제 보기
            <AiOutlineRight className="icon" />
          </ClassSummaryText>
        </ClassSummaryTextWrapper>
        <DescriptiveFormUpperTitle>{dummy.title}</DescriptiveFormUpperTitle>
      </DescriptiveFormUpperBox>
      <DescriptiveFormUpperBox className="item2">
        <AnalysisSubTitle>핵심 키워드</AnalysisSubTitle>
        <DescriptiveFormUpperItem>
          {dummy.keyword.map((item, idx) => (
            <StyledWorkbookStatus key={idx} status="loading">
              {item}
            </StyledWorkbookStatus>
          ))}
        </DescriptiveFormUpperItem>
      </DescriptiveFormUpperBox>
      <DescriptiveFormUpperBox className="item3">
        <AnalysisSubTitle>배점</AnalysisSubTitle>

        <DescriptiveFormUpperScore>{dummy.score}</DescriptiveFormUpperScore>
      </DescriptiveFormUpperBox>
    </DescriptiveFormUpper>
  );
}
