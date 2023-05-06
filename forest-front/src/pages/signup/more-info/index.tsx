import UserForm from "@/features/home/UserForm";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MoreInfo() {
  const router = useRouter();
  // const [email, setEmail] = useState("");

  // useEffect(() => {
  //   const email = router.query?.email;
  //   if (typeof email === "string") {
  //     setEmail(email);
  //   }
  // }, []);

  const movePageHandler = () => {
    router.push("/");
  };

  return <UserForm type={"moreinfo"} onClose={movePageHandler} />;
}

export default MoreInfo;
