import Login from "@/features/home/Login";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import withAuth from "@/utils/auth/withAuth";

function AuthLogin() {
  return <Login />;
}
export default avoidDuplicateLoginAuth(AuthLogin);
