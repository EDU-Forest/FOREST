import { CSSProperties } from "react";
import { LoginSuccessLayout } from "@/features/login/Login.style";
import { setRole, setUsername } from "@/stores/user/user";
import { setLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie-player";
import treeJson from "../../../public/lottieJson/tree.json";
import { ParsedUrlQuery } from "querystring";
import useRecentClassIdQuery from "@/apis/class/useRecentClassIdQuery";
import { RootState } from "@/stores/store";

interface IServerSideprops {
  query: ParsedUrlQuery;
}

function LoginSuccess() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, role } = useSelector((state: RootState) => state.user);
  const { refetch } = useRecentClassIdQuery(username, role);

  useEffect(() => {
    if (!router.isReady) return;

    const accessToken = router.query?.accessToken;
    if (typeof accessToken === "string") {
      setLocalStorage("forest_access_token", accessToken);
    } else return;

    const email = router.query?.email;
    if (typeof router.query?.name === "string" && typeof router.query?.role === "string") {
      dispatch(setUsername(router.query?.name));
      dispatch(setRole(router.query?.role));
      refetch();
    } else {
      router.push(
        {
          pathname: "/signup/more-info",
          query: {
            email: email,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, []);

  const treeStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "9.375rem",
    height: "9.375rem",
  };

  return (
    <LoginSuccessLayout>
      <Lottie loop animationData={treeJson} play style={treeStyle} />
    </LoginSuccessLayout>
  );
}

export default LoginSuccess;

export const getServerSideProps = async ({ query }: IServerSideprops) => {
  // const {name, role, email, accessToken} = query
  return {
    props: {},
  };
};
