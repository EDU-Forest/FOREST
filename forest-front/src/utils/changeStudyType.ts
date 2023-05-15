export const changeStudyType = (studyType: string) => {
  if (studyType === "SELF") return "자율";
  else if (studyType === "EXAM") return "시험";
  else if (studyType === "HOMEWORK") return "과제";
};
