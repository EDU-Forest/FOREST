import { StyledTestAnswerTable } from "./index.style";

export default function TestAnswerTable() {
  return (
    <StyledTestAnswerTable>
      <thead>
        <tr>
          <th colSpan={4}>정답 입력</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>1</td>
        </tr>
      </tbody>
    </StyledTestAnswerTable>
  );
}
