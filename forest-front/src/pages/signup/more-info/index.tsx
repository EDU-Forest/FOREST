import UserForm from "@/features/home/UserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MoreInfo() {
  const router = useRouter();
  // const [email, setEmail] = useState("");

  // useEffect(() => {
  //   const email = router.query?.email;
  //   console.log("email", email);
  //   if (typeof email === "string") {
  //     setEmail(email);
  //   }
  // }, []);

  const movePageHandler = () => {
    router.push("/");
  };

  return <UserForm type={"moreinfo"} onClose={movePageHandler} />;
}
