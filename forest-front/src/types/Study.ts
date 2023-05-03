interface IStudyId {
  studyId: number;
}

interface IStudyInfo {
  studyPresenter: string;
  studyVolume: number;
  studyTimeLimit: number;
}

interface IStudyModal {
  toggleModal: boolean;
  setToggleModal: (toggleModal: boolean) => void;
}

interface IStudySaveAnswer {
  studentStudyProblemId: number;
  studyId: number;
  userAnswer: string;
  type: string;
}
