import Login from "@/features/home/Login";
import avoidDuplicateLoginAuth from "@/utils/AvoidDuplicateLoginAuth";
import withAuth from "@/utils/withAuth";

function AuthLogin() {
  return <Login />;
}
export default avoidDuplicateLoginAuth(AuthLogin);
