import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TestEndModal from "@/features/test/index/TestEndModal";
import { dateToMinute, dateToSecond } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import TestEnd from "@/features/test/index/TestEnd";
import withAuth from "@/utils/auth/withAuth";
import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import { CanvasPath } from "react-sketch-canvas";

function Test() {
  const router = useRouter();
  const studyId = router.query.studyId;
  const { endTime } = useSelector((state: RootState) => state.exam);

  const [toggleModal, setToggleModal] = useState(false);
  const [minutes, setMinutes] = useState(dateToMinute(new Date(), endTime));
  const [seconds, setSeconds] = useState(dateToSecond(new Date(), endTime) % 60);
  const [allPaths, setAllPaths] = useState<CanvasPath[]>([]);
  const { data } = useGetStudyProblems(typeof studyId === "string" ? parseInt(studyId) : -1);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds <= 0) {
        if (minutes <= 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <StyledTestContainer>
      {/* 테스트용 */}
      {/* {toggleModal && <TestEndModal setToggleModal={setToggleModal} />}
      <TestHeader
        page={"study"}
        minutes={minutes}
        seconds={seconds}
        setToggleModal={setToggleModal}
      />
      {minutes > 0 && seconds > 0 ? (
        <TestEnd />
      ) : (
        <TestContent
          minutes={minutes}
          seconds={seconds}
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
        />
      )} */}
      {/* 아래가 원본 */}
      {toggleModal && <TestEndModal setToggleModal={setToggleModal} allPaths={allPaths} />}
      <TestHeader
        page={"study"}
        minutes={minutes}
        seconds={seconds}
        setToggleModal={setToggleModal}
      />
      {data?.isSubmitted ? (
        <TestEnd allPaths={allPaths} />
      ) : (
        <TestContent
          minutes={minutes}
          seconds={seconds}
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          allPaths={allPaths}
          setAllPaths={setAllPaths}
          isSubmitted={data?.isSubmitted}
        />
      )}
    </StyledTestContainer>
  );
}

export default withAuth(Test);

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
