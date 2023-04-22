import styled, { css } from "styled-components";

interface Iprops {
  role: string;
  selected: boolean;
}

const StyledRoleBtn = styled.button<{ selected: boolean }>`
  width: 32rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: start;

  .role-name {
    color: ${({ theme }) => theme.colors.Lime[600]};
    margin-right: 1rem;
  }

  .role-detail {
    color: ${({ theme }) => theme.colors.Lime[400]};
    font-size: 0.875rem;
  }

  ${({ selected }) =>
    selected &&
    css`
        background-color: ${({ theme }) => theme.colors.Lime[500]}};
        border: 2px solid ${({ theme }) => theme.colors.Lime[900]}};
        
        .role-name {
            color: white;
          }
        
          .role-detail {
            color: ${({ theme }) => theme.colors.Lime[100]}};
          }
        `}
`;

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
