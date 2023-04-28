import { flexBox } from "@/styles/theme";
import styled from "styled-components";
import { AnalysisUpper } from "./StudyAnalysis.style";
import { ResultTableItemBig } from "./EachResult.style";

const DescriptiveFormWrapper = styled.div`
  position: relative;
`;

const DescriptiveFormBtn = styled.div`
  position: absolute;
  right: 0;
  top: -4rem;

  span {
    font-weight: 700;
    font-size: 22px;
    color: ${({ theme }) => theme.colors.Lime[900]};
    margin-right: 16px;
  }
`;

const DescriptiveFormUpper = styled(AnalysisUpper)`
  align-items: stretch;

  .item1 {
    width: calc(50% - 0.75rem);
  }
  .item2 {
    width: calc(30% - 1.125rem);
  }
  .item3 {
    width: calc(20% - 1.125rem);
    div {
      ${flexBox("row", "center", "center")};
      height: calc(100% - 1.5rem);
    }
  }

  @media (max-width: 60rem) {
    .item1 {
      width: 100%;
    }
    .item2 {
      width: calc(60% - 0.75rem);
    }
    .item3 {
      width: calc(40% - 0.75rem);
    }
  }
`;

const DescriptiveFormUpperBox = styled.div`
  display: inline-block;
  background-color: white;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
`;

const DescriptiveFormUpperTitle = styled.div`
  margin-top: 1rem;
`;
const DescriptiveFormUpperItem = styled.div`
  margin-top: 0.5rem;
  ${flexBox("row", "center", "start")};
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DescriptiveFormUpperScore = styled.div`
  margin: auto;
  text-align: center;
  font-weight: 700;
  font-size: 3.75rem;
  color: ${({ theme }) => theme.colors.Lime[700]};
`;

const TableItemAnswer = styled(ResultTableItemBig)`
  width: 40%;
`;

export {
  DescriptiveFormWrapper,
  DescriptiveFormBtn,
  DescriptiveFormUpper,
  DescriptiveFormUpperBox,
  DescriptiveFormUpperTitle,
  DescriptiveFormUpperItem,
  DescriptiveFormUpperScore,
  TableItemAnswer,
};
