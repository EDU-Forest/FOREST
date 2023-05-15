import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const BackDropContainer = styled.div`
  ${flexBox("row", "center", "center")}
  /* background-color: rgba(0, 0, 0, 0.4); */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export { BackDropContainer };
