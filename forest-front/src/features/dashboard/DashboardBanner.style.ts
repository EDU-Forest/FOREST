import styled from "styled-components";

export const StyledDashboardBanner = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 40px;
  margin-top: 24px;

  background: linear-gradient(
    90.92deg,
    #66c476 0.71%,
    #82ce7e 20.21%,
    #9ed886 50.76%,
    #dff099 97.69%
  );
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;

  p {
    color: white;
  }

  span {
    color: white;
    font-size: 14px;
  }

  img {
    position: absolute;
    width: auto;
    height: 172px;
    right: 40px;
    top: -18px;
  }
`;
