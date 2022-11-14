import styled from "styled-components"



export const TodoCollectionChangeColor = styled.div`
  border: 1px solid #c4c4c4;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  
  &:hover {
    cursor: pointer;
    border: 1px solid #000;
  }
  `

export const TodoCollectionChangedColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props: {color: string}) => props.color};
  margin-left: 10px;
  `