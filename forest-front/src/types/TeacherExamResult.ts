interface TeacherExamResult {
  studyId: number;
  title: string;
  startTime: string; // Date?
  endTime: string; // Date?
  userName: string;
  studyType: string;
  scheduleType: string;
  studyCreatedDate: string; // 출제일  Date?
  workbookCreatedDate: string; // 출판일 Date ?
  volume: number; // 문항 수
  isPublic: boolean;
  average: number;
  standardDeviation: number; //표준편차
  averageSolvingTime: number;
  totalStudent: number;
  participantStudent: number;
  takeRate: number;
}