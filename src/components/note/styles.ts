import styled from "styled-components"
import ReactMarkdown from "react-markdown";
import {TextCustomScroll} from "../../styles/styled-components/CustomScroll";

export const DoubleScreenWrapper = styled.div`
  display: flex;
  height: 100%;
`

export const LeftSide = styled.div`
  flex: ${({width}: {width: number}) => '0 0 ' + width + '%'};
  padding: 20px;
  font-size: 18px;
  outline: none;
  resize: none;
  border: none;
  overflow-y: scroll;
  display: ${({width}: {width: number}) => width === 0 ? 'none' : 'block'};
  ${TextCustomScroll}
`

export const RightSide = styled.div`
  flex: ${({width}: {width: number}) => '0 0 ' + width + '%'};
  padding: 20px;
  outline: none;
  overflow-y: scroll;
  display: ${({width}: {width: number}) => width === 0 ? 'none' : 'block'};
  ${TextCustomScroll}
`