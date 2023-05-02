import { useSelector } from "react-redux";
import { StyledTestAnswerTable } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestAnswerTable() {
  const { problem } = useSelector((state: RootState) => state.exam);
  return (
    <StyledTestAnswerTable>
      <thead>
        <tr>
          <th colSpan={4}>정답 입력</th>
        </tr>
      </thead>
      <tbody>
        {problem.map((data, idx) => (
          <tr key={`user-answer-${idx}`}>
            <td>{idx + 1}</td>
            <td colSpan={3}>{data.userAnswer ? data.userAnswer : ""}</td>
          </tr>
        ))}
      </tbody>
    </StyledTestAnswerTable>
  );
}
