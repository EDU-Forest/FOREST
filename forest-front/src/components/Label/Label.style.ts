import styled from "styled-components";
import css from "styled-jsx/css";

const StyledLabel = styled.p<{ status: string }>`
  margin: 0;
  padding-top: 0.5rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  color: ${({ status, theme }) => {
    if (status === "pass") return theme.colors.Lime[600];
    else if (status === "fail") return theme.colors.Orange[500];
    else return theme.colors.Gray[500];
  }};

  .icon {
    font-size: 0.75rem;
    margin-right: 0.25rem;
  }

  &.vibrate-3 {
    -webkit-animation: vibrate-3 0.2s linear both;
    animation: vibrate-3 0.2s linear both;
  }

  @-webkit-keyframes vibrate-3 {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
    10% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }
    20% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }
    30% {
      -webkit-transform: translate(-2px, 2px);
      transform: translate(-2px, 2px);
    }
    40% {
      -webkit-transform: translate(2px, 2px);
      transform: translate(2px, 2px);
    }
    50% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }
    60% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }
    70% {
      -webkit-transform: translate(-2px, 2px);
      transform: translate(-2px, 2px);
    }
    80% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }
    90% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }
    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }
  @keyframes vibrate-3 {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
    10% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }
    20% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }
    30% {
      -webkit-transform: translate(-2px, 2px);
      transform: translate(-2px, 2px);
    }
    40% {
      -webkit-transform: translate(2px, 2px);
      transform: translate(2px, 2px);
    }
    50% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }
    60% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }
    70% {
      -webkit-transform: translate(-2px, 2px);
      transform: translate(-2px, 2px);
    }
    80% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }
    90% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }
    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }
`;

export { StyledLabel };
