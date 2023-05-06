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
import { useDispatch } from "react-redux";

interface Keyword {
  keyword: string;
}
interface Iprops {
  title?: string;
  keywordList?: Keyword[];
  point?: number;
}

export default function DescriptiveFormItem({ title, keywordList, point }: Iprops) {
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
        <DescriptiveFormUpperTitle>{title}</DescriptiveFormUpperTitle>
      </DescriptiveFormUpperBox>
      <DescriptiveFormUpperBox className="item2">
        <AnalysisSubTitle>핵심 키워드</AnalysisSubTitle>
        <DescriptiveFormUpperItem>
          {keywordList?.map((item, idx) => (
            <StyledWorkbookStatus key={idx} status="BEFORE">
              {item.keyword}
            </StyledWorkbookStatus>
          ))}
        </DescriptiveFormUpperItem>
      </DescriptiveFormUpperBox>
      <DescriptiveFormUpperBox className="item3">
        <AnalysisSubTitle>배점</AnalysisSubTitle>

        <DescriptiveFormUpperScore>{point}</DescriptiveFormUpperScore>
      </DescriptiveFormUpperBox>
    </DescriptiveFormUpper>
  );
}
