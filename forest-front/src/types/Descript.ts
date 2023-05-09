export interface Descript {
  problemListId: number;
  title: string;
  point: number; // 배점
  keywordNum: number;
  keywordList: Keyword[];
  studentList: StudentList[];
}

interface Keyword {
  keyword: string;
}

interface StudentList {
  studentNum: number; // 순번
  answer: string;
  similarity: number;
  sameNum: number;
}
