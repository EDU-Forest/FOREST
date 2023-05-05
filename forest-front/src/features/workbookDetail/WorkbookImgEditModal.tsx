import React from "react";
import {
  WorkbookImgEditModalBox,
  WorkbookImgEditModalImgBox,
  WorkbookImgTypeBox,
} from "./WorkbookDetail.style";
import SmallBtn from "@/components/Button/SmallBtn";

interface IProps {
  title: string;
  setSelectedImg: any;
  setIsOpenImgEdit: any;
}

function WorkbookImgEditModal({ title, setSelectedImg, setIsOpenImgEdit }: IProps) {
  const handleClick = (type: number) => {
    setSelectedImg(type);
    setIsOpenImgEdit(false);
  };

  const handleClickCancel = () => {
    setIsOpenImgEdit(false);
  };

  return (
    <WorkbookImgEditModalBox>
      <WorkbookImgEditModalImgBox>
        <WorkbookImgTypeBox type={1} onClick={() => handleClick(1)}>
          {title}
        </WorkbookImgTypeBox>
        <WorkbookImgTypeBox type={2} onClick={() => handleClick(2)}>
          {title}
        </WorkbookImgTypeBox>
        <WorkbookImgTypeBox type={3} onClick={() => handleClick(3)}>
          {title}
        </WorkbookImgTypeBox>
      </WorkbookImgEditModalImgBox>
      <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
    </WorkbookImgEditModalBox>
  );
}

export default WorkbookImgEditModal;
