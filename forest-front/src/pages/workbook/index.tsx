import useWorkbookListQuery from "@/apis/workbook/useWorkbookListQuery";
import TeacherNav from "@/components/Nav/TeacherNav";
import { StyledFullSectionBox } from "@/features/dashboard/Dashboard.style";
import LikeWorkbook from "@/features/workbook/LikeWorkbook";
import MadeOneselfWorkbook from "@/features/workbook/MadeOneselfWorkbook";
import UsedWorkbook from "@/features/workbook/UsedWorkbook";
import WorkbookTab from "@/features/workbook/WorkbookTab";
import { Container, FullScreen } from "@/styles/container";
import { WorkbookType } from "@/types/Workbook";
import withAuth from "@/utils/auth/withAuth";
import { useEffect, useState } from "react";

function Workbook() {
  const [selectedType, setSelectedType] = useState("like");
  const [page, setPage] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [list, setList] = useState<WorkbookType[]>([]);

  const { data, refetch, isSuccess } = useWorkbookListQuery(selectedType, page, 15);

  useEffect(() => {
    const container: HTMLElement | null = document.getElementById("workbook-container");
    const contentContainer: HTMLElement | null = document.getElementById(
      "workbook-content-container",
    );
    const handleScroll = () => {
      const scrollTop = container?.scrollTop;
      const offsetHeight = contentContainer?.offsetHeight;

      if (scrollTop && offsetHeight && window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    };

    setFetching(true);
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 탭 전환될 때마다 초기화
    setPage(0);
    setFetching(false);
    setNextPage(true);
    setList([]);
  }, [selectedType]);

  useEffect(() => {
    // 탭 전환되고, 초기화 완료되었을 때 refetch
    page === 0 && isFetching === false && hasNextPage === true && refetch();
  }, [selectedType, page, isFetching, hasNextPage]);

  useEffect(() => {
    // 기존 리스트 + 무한 스크롤로 불러온 새 리스트
    data && setList([...list, ...(data?.workbookList || [])]);
  }, [data?.workbookList]);

  useEffect(() => {
    // 새로운 데이터의 응답이 성공일 때마다 업데이트
    if (isSuccess) {
      setPage(data.pageable.pageNumber + 1);
      setNextPage(!data.last);
      setFetching(false);
    }
  }, [data]);

  useEffect(() => {
    if (isFetching && hasNextPage) refetch();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <FullScreen>
      <TeacherNav nowLocation={"workbook"} />
      <Container id="workbook-container" padding={2.5}>
        <StyledFullSectionBox id="workbook-content-container" padding={40} tabletPadding={24}>
          <WorkbookTab selectedType={selectedType} setSelectedType={setSelectedType} />
          {selectedType === "like" ? (
            <LikeWorkbook list={list} />
          ) : selectedType === "use" ? (
            <UsedWorkbook list={list} />
          ) : (
            selectedType === "own" && <MadeOneselfWorkbook list={list} />
          )}
        </StyledFullSectionBox>
      </Container>
    </FullScreen>
  );
}

export default withAuth(Workbook);
