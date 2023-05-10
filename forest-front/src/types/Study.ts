export interface IStudyId {
  studyId: number;
}

export interface IStudyInfo {
  studyPresenter: string;
  studyVolume: number;
  studyTimeLimit: number;
}

export interface IStudyModal {
  minutes: number;
  seconds: number;
  toggleModal: boolean;
  setToggleModal: (toggleModal: boolean) => void;
}

export interface IStudySaveAnswer {
  studentStudyProblemId: number;
  studyId: number;
  userAnswer: string;
  type: string;
}

export interface IStudyResult {
  score: number;
  correctNum: number;
  solvingTime: number;
  correctRate: number;
  isGraded: boolean;
  isSubmitted: boolean;
  volume: number;
  startTime: Date;
  endTime: Date;
}

export interface IStudyTimeLimit {
  minutes: number;
  seconds: number;
}

export interface IStudentStudyProblemResultList {
  problemNum: number;
  isCorrected: boolean;
}
