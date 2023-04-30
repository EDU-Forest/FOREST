interface examState {
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
    item?: {
      itemId: number;
      no: number;
      content: string;
      isImage: boolean;
    }[];
  }[];
}
