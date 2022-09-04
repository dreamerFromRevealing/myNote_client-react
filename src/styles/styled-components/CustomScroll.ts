import styled from "styled-components"

export const TextCustomScroll = `
&::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #556CD6;
  }
`

export const CustomScroll = styled.div`
  ${TextCustomScroll}
`