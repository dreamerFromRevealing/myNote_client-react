import styled from "styled-components"

export const ModalWrapper = styled.div`
  width: 90vw;
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  padding: 5px;
  
  @media (max-width: 576px) {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
  }
  `

export const ModalContent = styled.div`
  padding: 10px;
  `