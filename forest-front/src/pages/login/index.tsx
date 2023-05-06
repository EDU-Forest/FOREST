import Login from "@/features/home/Login";
import withAuth from "@/utils/withAuth";

function AuthLogin() {
  return <Login />;
}
export default withAuth(AuthLogin);
