import useBookmarkPatch from "@/apis/search/useBookmarkPatch";
import {
  WorkbookCard,
  WorkbookContent,
  WorkbookContentWrapper,
  WorkbookIcon,
  WorkbookImg,
  WorkbookTitle,
} from "./Workbook.style";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import useBookmarkPost from "@/apis/search/useBookmarkPost";
import useBookmarkDelete from "@/apis/search/useBookmarkDelete";

interface Iprops {
  id: number;
  title: string;
  bookmarkCount?: number;
  scrapCount?: number;
  isBookmarked?: boolean;
  workbookImgPath?: string;
  methodType?: string;
  clickAction?: (id: number) => void;
  isWorkbookPage?: boolean;
}

export default function CommonWorkbook({
  id,
  title,
  bookmarkCount,
  scrapCount,
  isBookmarked,
  workbookImgPath,
  methodType,
  clickAction,
  isWorkbookPage
}: Iprops) {
  const patchMutate = useBookmarkPatch().mutate;
  const postMutate = useBookmarkPost(isWorkbookPage).mutate;
  const deleteMutate = useBookmarkDelete(isWorkbookPage).mutate;
  const pressHeart = () => {
    if (isBookmarked) {
      deleteMutate(id);
      return;
    }
    if (methodType === "POST") {
      postMutate(id);
    } else {
      patchMutate(id);
    }
  };

  return (
    <WorkbookCard>
      {workbookImgPath ? (
        <WorkbookImg src={workbookImgPath} onClick={() => clickAction && clickAction(id)} />
      ) : (
        <WorkbookImg src={"/images/workbook.png"} onClick={() => clickAction && clickAction(id)} />
      )}
      <WorkbookTitle onClick={() => clickAction && clickAction(id)}>{title}</WorkbookTitle>
      {(bookmarkCount || bookmarkCount === 0) && (
        <WorkbookContentWrapper>
          <WorkbookContent bg>
            <span>{scrapCount} </span>
            명이 이용 중이에요
          </WorkbookContent>
          <div>
            <WorkbookIcon onClick={pressHeart}>
              {isBookmarked ? <BsSuitHeartFill /> : <BsSuitHeart />}
            </WorkbookIcon>
            <WorkbookContent>{bookmarkCount}</WorkbookContent>
          </div>
        </WorkbookContentWrapper>
      )}
    </WorkbookCard>
  );
}
