interface IStudyId {
  studyId: number;
}

interface IStudyInfo {
  studyTitle: string;
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
