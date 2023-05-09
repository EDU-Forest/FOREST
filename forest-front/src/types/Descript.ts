export interface Descript {
  problemListId: number;
  title: string;
  point: number; // 배점
  keywordNum: number;
  keywordList: Keyword[];
  studentList: IStudentList[];
}

export interface Keyword {
  keyword: string;
}

export interface IStudentList {
  studentNum: number; // 순번
  answer: string;
  similarity: number;
  sameNum: number;
}
