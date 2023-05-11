import useBookmarkDelete from "@/apis/search/useBookmarkDelete";
import useBookmarkPost from "@/apis/search/useBookmarkPost";
import { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {
  WorkbookCard,
  WorkbookContent,
  WorkbookContentWrapper,
  WorkbookIcon,
  WorkbookImg,
  WorkbookTitle,
} from "./Workbook.style";

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
  isWorkbookPage,
}: Iprops) {
  const postMutate = useBookmarkPost(isWorkbookPage).mutate;
  const deleteMutate = useBookmarkDelete(isWorkbookPage).mutate;

  const [isNewBookmarked, setIsNewBookmarked] = useState(isBookmarked);
  const [newBookmarkCount, setNewBookmarkCount] = useState(bookmarkCount);

  const pressHeart = () => {
    if (isNewBookmarked) {
      deleteMutate(id);
      setIsNewBookmarked(false);
      newBookmarkCount && setNewBookmarkCount(newBookmarkCount - 1);
      return;
    } else {
      setIsNewBookmarked(true);
      newBookmarkCount !== undefined && setNewBookmarkCount(newBookmarkCount + 1);
      postMutate(id);
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
          {/* 스크랩 비활성화 */}
          {/* <WorkbookContent bg>
            <span>{scrapCount} </span>
            명이 이용 중이에요
          </WorkbookContent> */}
          <div>
            <WorkbookIcon onClick={pressHeart}>
              {isNewBookmarked ? <BsSuitHeartFill /> : <BsSuitHeart />}
            </WorkbookIcon>
            <WorkbookContent>{newBookmarkCount}</WorkbookContent>
          </div>
        </WorkbookContentWrapper>
      )}
    </WorkbookCard>
  );
}
