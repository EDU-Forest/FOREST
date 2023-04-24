import { StyledRoleBtn } from "./Btn.style";

interface Iprops {
  role: string;
  selected: boolean;
}

export default function RoleBtn({ role, selected }: Iprops) {
  const roleName = (role: string) => {
    if (role === "teacher") {
      return "선생님";
    } else {
      return "학생";
    }
  };
  const roleDetail = (role: string) => {
    if (role === "teacher") {
      return "문제를 생성하고 배포할 수 있으며, 클래스 관리를 해요";
    } else {
      return "출제되거나 배포된 문제를 풀 수 있어요";
    }
  };
  return (
    <StyledRoleBtn selected={selected}>
      <span className="role-name">{roleName(role)}</span>
      <span className="role-detail">{roleDetail(role)}</span>
    </StyledRoleBtn>
  );
}
