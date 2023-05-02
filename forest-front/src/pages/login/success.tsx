import Spinner from "@/components/Spinner/Spinner";
import { LoginSuccessLayout } from "@/features/login/Login.style";
import { setRole, setUsername } from "@/stores/user/user";
import { FullScreen } from "@/styles/container";
import { setLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LoginSuccess() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
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
      router.push(`/${role.toLowerCase()}/dashboard`);
    } else {
      router.push({
        pathname: "/signup/more-info",
        query: {
          email: email,
        },
      });
    }
  }, []);
  return (
    <LoginSuccessLayout>
      <Spinner />
    </LoginSuccessLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
