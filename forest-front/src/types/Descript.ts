interface Descript {
  problemListId: number;
  title: string;
  point: number; // 배점
  keywordNum: number;
  keywordList: string[];
  srudentList: StudentList[];
}

interface StudentList {
  studentNum: number; // 순번
  answer: string;
  similarity: number;
  samaNum: number;
}
