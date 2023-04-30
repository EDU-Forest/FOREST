import { useSelector } from "react-redux";
import { StyledTestAnswerTable } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestAnswerTable() {
  const { problems } = useSelector((state: RootState) => state.exam);
  return (
    <StyledTestAnswerTable>
      <thead>
        <tr>
          <th colSpan={4}>정답 입력</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem, idx) => (
          <tr>
            <td>{idx + 1}</td>
            <td>{problem.userAnswer ? problem.userAnswer : ""}</td>
          </tr>
        ))}
      </tbody>
    </StyledTestAnswerTable>
  );
}
