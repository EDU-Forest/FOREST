import { CSSProperties } from "react";
import useRecentClassIdQuery from "@/apis/class/useRecentClassIdQuery";
import Spinner from "@/components/Spinner/Spinner";
import { LoginSuccessLayout } from "@/features/login/Login.style";
import { setRole, setUsername } from "@/stores/user/user";
import { FullScreen } from "@/styles/container";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import { setLocalStorage } from "@/utils/localStorage";
import withAuth from "@/utils/auth/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Lottie from "react-lottie-player";
import treeJson from "../../../public/lottieJson/tree.json";
import { ParsedUrlQuery } from "querystring";

interface IServerSideprops {
  query: ParsedUrlQuery;
}

interface Iprops {
  name: string;
  role: string;
  email: string;
  accessToken: string;
}

function LoginSuccess() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { refetch } = useRecentClassIdQuery();

  useEffect(() => {
    if (!router.isReady) return;
    const data = router?.query;

    const accessToken = router.query?.accessToken;
    if (typeof accessToken === "string") {
      setLocalStorage("forest_access_token", accessToken);
    } else return;

    const username = router.query?.name;
    const role = router.query?.role;
    const email = router.query?.email;
    if (typeof username === "string" && typeof role === "string") {
      dispatch(setUsername(username));
      dispatch(setRole(role));
      refetch();
      router.push(`/${role.toLowerCase()}/dashboard`);
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
