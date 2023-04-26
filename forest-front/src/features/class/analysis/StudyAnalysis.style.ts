import { FullScreen } from "@/styles/container";
import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const AnalysisFullScreen = styled(FullScreen)`
  ${flexBox("column", "start", "start")}
`;
const StudyAnalysisTitle = styled.div`
  ${flexBox("row", "center", "left")}
  width: 100%;
  height: 80px;
  background-color: white;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
`;

export { AnalysisFullScreen, StudyAnalysisTitle };
