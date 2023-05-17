import { TestProblemImgBox } from "./TextIndex.style";

interface Iprops {
  problemImgPath: string;
}

export default function TestProblemImg({ problemImgPath }: Iprops) {
  return (
    <TestProblemImgBox>
      <img src={problemImgPath} />
    </TestProblemImgBox>
  );
}
