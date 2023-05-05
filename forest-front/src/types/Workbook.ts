export interface WorkbookType {
  workbookId: number;
  workbookImgPath: string;
  title: string;
  description: string;
  isPublic: boolean;
  bookmarkCount: number;
  scrapCount: number;
  volume: number;
  isOriginal: boolean;
}

export interface QuestionItemType {
  id: number;
  no: number;
  content: string;
  isImage: boolean;
}

export interface QuestionType {
  problemId: number;
  problemNum: number;
  type: string;
  title: string;
  text: string;
  answer: string;
  point: number;
  problemImgPath: string;
  itemList: QuestionItemType[];
  imgIsEmpty: boolean;
  textIsEmpty: boolean;
}

export interface QuestionSummType {
  id: number;
  title: string;
}

export interface IWorkbookBySelf {
  workbookId: number;
  title: string;
}
