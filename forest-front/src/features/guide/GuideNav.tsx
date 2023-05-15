import { StyledNav } from "@/components/Nav/Nav.style";
import { useRouter } from "next/router";

export default function GuideNav() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <StyledNav>
      <img src={"/images/Forest_Logo.png"} className="logo-img" onClick={goBack} />
    </StyledNav>
  );
}
