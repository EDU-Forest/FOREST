import { setInitClassInfo } from "@/stores/class/classInfo";
import { setInitEditorQuestions } from "@/stores/editor/editorQuestions";
import { setInitEditorWorkbook } from "@/stores/editor/editorWorkbook";
import { setInitCanvas } from "@/stores/exam/canvas";
import { setInitExam } from "@/stores/exam/exam";
import { setLogout } from "@/stores/user/user";
import { setInitWorkbookDetail } from "@/stores/workbookDetail/workbookDetail";
import { removeItemLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(setLogout());
    dispatch(setInitClassInfo());
    dispatch(setInitEditorQuestions());
    dispatch(setInitEditorWorkbook());
    dispatch(setInitCanvas());
    dispatch(setInitExam());
    dispatch(setInitWorkbookDetail());
    removeItemLocalStorage("forest_access_token");
    router.push("/", undefined, { shallow: true });
  };

  return { logout };
}

export default useAuth;
