interface examState {
  isStarted: boolean;
  curProblemNum: number;
  examTitle: string;
  volume: number;
  startTime: number;
  endTime: number;
  presenter: string;
  problem: {
    studentStudyProblemId: number;
    problemNum: number;
    type: string;
    title: string;
    text: string;
    problemImgPath?: string;
    userAnswer: string;
    problemAnswer: string;
    item?: {
      itemId: number;
      no: number;
      content: string;
      isImage: boolean;
    }[];
  }[];
}
