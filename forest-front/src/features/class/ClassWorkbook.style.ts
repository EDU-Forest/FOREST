import styled from "styled-components";

const ClassWorkbookWrapper = styled.div`
  width: 100%;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2.25rem;
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.Lime[600]};
  }
`;

export { ClassWorkbookWrapper, CheckIconWrapper };
