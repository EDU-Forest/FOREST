import { CSSProperties } from "react";
import useRecentClassIdQuery from "@/apis/class/useRecentClassIdQuery";
import { LoginSuccessLayout } from "@/features/login/Login.style";
import { setRole, setUsername } from "@/stores/user/user";
import { setLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Lottie from "react-lottie-player";
import treeJson from "../../../public/lottieJson/tree.json";

interface IServerSideprops {
  query: {
    name?: string;
    role?: string;
    email?: string;
    accessToken?: string;
  };
}

interface Iprops {
  name?: string;
  role?: string;
  email?: string;
  accessToken?: string;
}

function LoginSuccess({ name, role, email, accessToken }: Iprops) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { refetch } = useRecentClassIdQuery();

  useEffect(() => {
    if (!router.isReady) return;

    // const accessToken = router.query?.accessToken;
    if (typeof accessToken === "string") {
      setLocalStorage("forest_access_token", accessToken);
    } else return;

    // const username = router.query?.name;
    // const role = router.query?.role;
    // const email = router.query?.email;
    console.log("data", name, role, email, accessToken);

    async function login(name: string, role: string) {
      await refetch();
      dispatch(setUsername(name));
      dispatch(setRole(role));
      router.push(`/${role.toLowerCase()}/dashboard`, undefined, { shallow: true });
    }

    if (typeof name === "string" && typeof role === "string") {
      login(name, role);
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

export const getServerSideProps = async ({
  query: { name, role, email, accessToken },
}: IServerSideprops) => {
  return {
    props: {
      name,
      role,
      email,
      accessToken,
    },
  };
};
