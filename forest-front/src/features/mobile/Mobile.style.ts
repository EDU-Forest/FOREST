import styled from "styled-components";

const MobileLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.Lime[50]};

  img {
    width: 6.25rem;
    height: 6.25rem;
  }
`;

const MobileBox = styled.div`
  width: 90%;
  /* background-color: ${({ theme }) => theme.colors.Lime[50]}; */
  background-color: white;
  padding: 1rem;
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.Lime[500]};
  /* color: ${({ theme }) => theme.colors.Lime[900]}; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    padding: 0.5rem;
  }

  > p:nth-of-type(1) {
    padding-top: 2rem;
  }
`;

export { MobileLayout, MobileBox };
