export interface examState {
  isSubmitted: boolean;
  isEnded: boolean;
  isStarted: boolean;
  curProblemNum: number;
  volume: number;
  startTime: Date | null;
  endTime: Date | null;
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

export interface IQuestionResult {
  problemNum: number;
  isCorrected: boolean;
}
