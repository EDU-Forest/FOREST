import UserForm from "@/features/home/UserForm";
import { useRouter } from "next/router";

export default function MoreInfo() {
  const router = useRouter();
  const movePageHandler = () => {
    router.push("/");
  };

  return (
    <UserForm
      type={"moreinfo"}
      email={typeof router.query?.email === "string" ? router.query?.email : ""}
      onClose={movePageHandler}
    />
  );
}
