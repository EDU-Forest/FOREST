import React, { useEffect } from "react";
import {
  WorkbookImgEditModalBox,
  WorkbookImgEditModalImgBox,
  WorkbookImgTypeBox,
} from "./WorkbookDetail.style";
import SmallBtn from "@/components/Button/SmallBtn";
import useWorkbookDetailImgQuery from "@/apis/workbookDetail/useWorkbookDetailImgQuery";

interface IProps {
  title: string;
  setSelectedImg: any;
  setIsOpenImgEdit: any;
  imgPath: string;
  setImgPath: any;
}

function WorkbookImgEditModal({
  title,
  setSelectedImg,
  setIsOpenImgEdit,
  imgPath,
  setImgPath,
}: IProps) {
  const { data: { workbookImgList: imgs } = { workbookImgList: [] } } = useWorkbookDetailImgQuery();

  console.log(imgs[0]?.workbookImgPath);

  const handleClick = (type: number) => {
    setSelectedImg(type);
    setIsOpenImgEdit(false);
    setImgPath(imgs[type - 1]?.workbookImgPath);
  };

  const handleClickCancel = () => {
    setIsOpenImgEdit(false);
  };

  return (
    <WorkbookImgEditModalBox>
      <WorkbookImgEditModalImgBox>
        <WorkbookImgTypeBox path={imgs[0]?.workbookImgPath} onClick={() => handleClick(1)}>
          {title}
        </WorkbookImgTypeBox>
        <WorkbookImgTypeBox path={imgs[1]?.workbookImgPath} onClick={() => handleClick(2)}>
          {title}
        </WorkbookImgTypeBox>
        <WorkbookImgTypeBox path={imgs[2]?.workbookImgPath} onClick={() => handleClick(3)}>
          {title}
        </WorkbookImgTypeBox>
      </WorkbookImgEditModalImgBox>
      <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
    </WorkbookImgEditModalBox>
  );
}

export default WorkbookImgEditModal;
