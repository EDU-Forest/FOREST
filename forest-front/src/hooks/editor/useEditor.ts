import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function useEditor() {
  const dispatch = useDispatch();
  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  const toChangeQuestions = (property: string, value: any) => {
    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      [property]: value,
    });

    dispatch(setQuestions([...copyArr]));
  };
  return [toChangeQuestions];
}

export default useEditor;
