import UserForm from "@/features/home/UserForm";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import withAuth from "@/utils/auth/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IServerSideProps {
  query: {
    email: string;
  };
}

interface Iprops {
  email: string;
}

function MoreInfo({ email }: Iprops) {
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

  return <UserForm type={"moreinfo"} email={email} onClose={movePageHandler} />;
}

export default avoidDuplicateLoginAuth(MoreInfo);

export const getServerSideProps = async ({ query: { email } }: IServerSideProps) => {
  return {
    props: {
      email,
    },
  };
};
