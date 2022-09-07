import styled from "styled-components"
import {OutlinedInput} from "@mui/material";

interface NodeWrapperProps {
  level: number
}

export const NodeWrapper = styled.div<NodeWrapperProps>`
  padding-left: ${({level}) => level * 16 + 'px'};
  cursor: pointer;
`


export const NodeTextWrap = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 0 0 86%;
  
  input {
    max-width: 100%;
  }
`

export const NodeItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  justify-content: space-between;
`

export const NodeRow = styled.div`
  display: flex;
  align-items: center;  
  width: 90%;
  
 `

export const TreeInput = styled(OutlinedInput)`
  input {
    padding: 0;
  }
  fieldset {
   
  }
`