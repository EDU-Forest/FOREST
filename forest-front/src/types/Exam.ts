export interface examState {
  isStarted: boolean;
  curProblemNum: number;
  volume: number;
  startTime: Date;
  endTime: Date;
  userName: string;
  studyName: string;
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
