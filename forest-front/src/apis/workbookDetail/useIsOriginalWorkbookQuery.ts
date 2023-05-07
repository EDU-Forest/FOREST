// // 문제집 내보내기 가능 범위 확인

// import workbookAxios from "@/utils/customAxios/workbookAxios";
// import { useQuery } from "react-query";
// import * as queryKeys from "@/constants/queryKeys";

// const fetcher = (wId: number) =>
//   workbookAxios.get(`/api/workbook/export/${wId}`).then(({ data }) => {
//     console.log(data);
//     return data;
//   });

// const useIsOriginalWorkbook = (wId: number, setIsOriginal: (isOriginal: boolean) => void) => {
//   return useQuery(queryKeys.IS_ORIGINAL, () => fetcher(wId), {
//     refetchOnWindowFocus: false,
//     onSuccess: (data) => {
//       console.log(data);
//       setIsOriginal(data.data.isOriginal);
//     },
//   });
// };

// export default useIsOriginalWorkbook;
