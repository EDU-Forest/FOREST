import styled, { keyframes } from "styled-components";
import css from "styled-jsx/css";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
  transform: translate(-50%, 0%);
    }
to {
    opacity: 1;
  transform: translate(-50%, 15px);

  }
`;

const fadeOutUp = keyframes`
  0% {
    opacity: 1;
  transform: translate(-50%, 0%);
    }
to {
    opacity: 0;
  transform: translate(-50%, 15px);

  }
`;

export const ToastBox = styled.div<{ isOpen: boolean }>`
  min-width: 400px;

  position: fixed;
  display: flex;

  padding: 16px 20px;

  left: 50%;
  top: 30px;
  transform: translate(-50%, 15px);
  z-index: 40;

  background-color: rgb(0 0 0 / 75%);
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);

  animation: ${(props) => (props.isOpen ? fadeInUp : fadeOutUp)} 1s;

  svg {
    width: 1.5rem;
    height: 1.5rem;

    margin-right: 1rem;

    align-self: center;

    fill: ${({ theme }) => theme.colors.Lime[600]};
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 4px;
  }

  /* sub title */
  p:nth-child(1) {
    color: ${({ theme }) => theme.colors.Gray[500]};
    font-size: 14px;
  }
  /* title */
  p:last-child {
    color: white;
    font-size: 1rem;
  }
`;
