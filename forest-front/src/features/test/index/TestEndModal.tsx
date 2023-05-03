import { useSelector } from "react-redux";
import { TestEndModalBox, TestWarningBox } from "./TextIndex.style";
import { AiOutlineWarning } from "react-icons/ai";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { RootState } from "@/stores/store";
import { TestBtnBox } from "../result/TextResult.style";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useEndStudy from "@/apis/study/useEndStudyQuery";

interface Iprops {
  setToggleModal: (toggled: boolean) => void;
}

export default function TestEndModal({ setToggleModal }: Iprops) {
  const router = useRouter();
  const { mutate } = useEndStudy();
  const studyId = router.query.studyId;
  const { problem } = useSelector((state: RootState) => state.exam);
  const [remainProblem, setRemainProblem] = useState(0);

  useEffect(() => {
    setRemainProblem(
      problem.reduce((acc, val) => {
        return val.userAnswer ? acc : acc + 1;
      }, 0),
    );
  }, []);

  const cancelHandler = () => {
    setToggleModal(false);
  };

  const okHandler = () => {
    mutate(typeof studyId === "string" ? parseInt(studyId) : -1);
    setToggleModal(false);
    router.push(`/test/${router.query.studyId}/result`);
  };

  return (
    <TestEndModalBox>
      <p>시험을 종료하시겠습니까?</p>
      {remainProblem !== 0 && (
        <TestWarningBox>
          <AiOutlineWarning />
          <p>{remainProblem} 개의 풀지 못한 문제가 있습니다.</p>{" "}
        </TestWarningBox>
      )}
      <TestBtnBox>
        <IoMdClose onClick={cancelHandler} className="cancel" />
        <IoMdCheckmark onClick={okHandler} className="ok" />
      </TestBtnBox>
    </TestEndModalBox>
  );
}
