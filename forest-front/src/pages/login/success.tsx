import { setRole, setUsername } from "@/stores/user/user";
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
    console.log(username, role, email);
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
  return <>테스트</>;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
