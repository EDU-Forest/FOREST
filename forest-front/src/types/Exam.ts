export interface examState {
  isTimeOut: boolean;
  studyId: number;
  isSubmitted: boolean;
  isGraded: boolean;
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
  toggleModal: boolean;
  page: string;
}

export interface IQuestionResult {
  problemNum: number;
  isCorrected: boolean;
}
