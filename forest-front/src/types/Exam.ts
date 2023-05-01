interface examState {
  curProblemNum: number;
  examTitle: string;
  volume: number;
  timeLimit: number;
  problems: {
    userAnswer: number;
    problemNum: number;
    type: string;
    title: string;
    text: string;
    problemImgPath?: string;
    items?: {
      itemId: number;
      no: number;
      content: string;
      isImage: boolean;
    }[];
  }[];
}
