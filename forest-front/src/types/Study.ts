interface IStudyId {
  studyId: number;
}

interface IStudyInfo {
  studyPresenter: string;
  studyVolume: number;
  studyTimeLimit: number;
}

interface IStudyModal {
  minutes: number;
  seconds: number;
  toggleModal: boolean;
  setToggleModal: (toggleModal: boolean) => void;
}

interface IStudySaveAnswer {
  studentStudyProblemId: number;
  studyId: number;
  userAnswer: string;
  type: string;
}

interface IStudyResult {
  score: number;
  correctNum: number;
  solvingTime: number;
  correctRate: number;
  isGraded: boolean;
  volume: number;
  startTime: Date;
  endTime: Date;
}

interface IStudyTimeLimit {
  minutes: number;
  seconds: number;
}
