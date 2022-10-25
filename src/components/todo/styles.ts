import styled from "styled-components"

export const TodoBoardWrapper = styled.div`
  background-color: #f5f9fa;
  min-height: 100%;
  border-radius: 10px;
  padding: 20px;
  margin: 5px;
  box-shadow: ${({borderColor}: {borderColor: string}) => '0 0 5px 0 ' + borderColor};
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: ${({borderColor}: {borderColor: string}) => '0 0 7.5px 0 ' + borderColor};
  }
`

export const TodoBoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const TodoAddTaskBtn = styled.div`
  background-color: #eaf1f1;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: 20px;
  svg {
    transition: all 0.3s ease-in-out;
  }
  
  
  &:hover {
    background-color: #d4e3e3;
    svg {
      transform: scale(1.3);
    }
  }
`
