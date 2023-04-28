interface StudentExamList {
  studyId: number;
  title: string;
  startTime: string;
  endTime: string;
  userName: string; //출제자 이름
  studyType: string;
  scheduleType: string;
  studentResult: {
    totalScore: number; // 문제집 총 점수
    studentScore: number; // 학생 점수
    percentage: number; // 백분율 환산
    correctNum: number; // 정답 문항 수
    solvingTime: number; // 분 단위
  };
  classResult: {
    average: number;
    standardDeviation: number;
    averageSolvingTime: number; // 분 단위
  };
}
