import styled from "styled-components"

export const TextCustomScroll = `
&::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #F5F5F5;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    background-image: radial-gradient(circle at 50% -20.71%, #ff7f85 0, #ff748c 8.33%, #ff6994 16.67%, #ff5d9c 25%, #ff52a4 33.33%, #ff47ad 41.67%, #f23cb5 50%, #e234be 58.33%, #cf32c8 66.67%, #b935d2 75%, #9f3bdb 83.33%, #7e42e5 91.67%, #514aed 100%);
    border-radius: 5px;
  }
`

export const CustomScroll = styled.div`
  ${TextCustomScroll}
`