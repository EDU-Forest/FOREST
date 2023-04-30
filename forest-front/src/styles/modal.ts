import styled from "styled-components";

export const ModalBox = styled.div<{ padding?: number }>`
  /* 모달창 크기 */
  min-width: 18.75rem;
  min-height: 12.5rem;

  position: fixed;
  display: flex;
  flex-direction: column;

  padding: ${({ padding }) => (padding ? padding : 32)}px 48px;
  gap: 2rem;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;

  background: #ffffff;
  box-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  z-index: 999;

  /* 모달 타이틀 */
  p:first-child {
    font-size: 1.375rem;
    font-weight: bold;
  }
`;

export const ModalBtnsBox = styled.div`
  display: flex;
  gap: 2.75rem;
`;
