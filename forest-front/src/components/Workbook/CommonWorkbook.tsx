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
  WorkbookImgBox,
  WorkbookTitle,
} from "./Workbook.style";
import { titleFormatter } from "@/utils";

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

  const pressHeart = () => {
    if (isBookmarked) {
      deleteMutate(id);

      return;
    } else {
      postMutate(id);
    }
  };

  return (
    <WorkbookCard>
      {workbookImgPath ? (
        <WorkbookImgBox>
          <WorkbookImg src={workbookImgPath} onClick={() => clickAction && clickAction(id)} />
          <p>{titleFormatter(title)}</p>
        </WorkbookImgBox>
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
              {isBookmarked ? <BsSuitHeartFill /> : <BsSuitHeart />}
            </WorkbookIcon>
            <WorkbookContent>{bookmarkCount}</WorkbookContent>
          </div>
        </WorkbookContentWrapper>
      )}
    </WorkbookCard>
  );
}
