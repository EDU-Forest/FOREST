import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../localStorage";

const avoidDuplicateLoginAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { role, username } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
      const accessToken = getLocalStorage("forest_access_token");
      if (role && username && accessToken) {
        router.push(`/${role.toLowerCase()}/dashboard`);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default avoidDuplicateLoginAuth;
