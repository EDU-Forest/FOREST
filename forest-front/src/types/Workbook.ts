export interface WorkbookType {
  id: number;
  cover: string;
  title: string;
  likeCnt: number;
  usedCnt: number;
}

export interface QuestionType {
  id: number;
  problemNum: number;
  type: string;
  title: string;
  text: string;
  point: number;
  image: string;
  items: {
    id: number;
    no: number;
    content: string;
    path: string;
  }[];
}

export interface QuestionSummType {
  id: number;
  title: string;
}
