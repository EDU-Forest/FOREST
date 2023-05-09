import { UserData } from "@/types/Userdata";
import { StyledRoleBtn } from "./Btn.style";
import { AiOutlineCheck } from "react-icons/ai";

interface Iprops {
  role: "STUDENT" | "TEACHER";
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export default function RoleBtn({ role, userData, setUserData }: Iprops) {
  const roleName = (role: string) => {
    if (role === "TEACHER") {
      return "선생님";
    } else {
      return "학생";
    }
  };
  const roleDetail = (role: string) => {
    if (role === "TEACHER") {
      return "문제를 생성하고 배포할 수 있으며, 클래스 관리를 해요";
    } else {
      return "출제되거나 배포된 문제를 풀 수 있어요";
    }
  };

  const roleClickHandler = () => {
    setUserData({
      ...userData,
      role: role,
    });
  };

  return (
    <StyledRoleBtn type="button" onClick={roleClickHandler} selected={userData.role === role}>
      <span className="role-name">{roleName(role)}</span>
      <span className="role-detail">{roleDetail(role)}</span>
      {userData.role === role && <AiOutlineCheck className="icon" />}
    </StyledRoleBtn>
  );
}
