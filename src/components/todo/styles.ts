import styled from "styled-components"

export const TodoCollectionWrapper  = styled.div`
  background-color: #f5f9fa;
  min-height: 100%;
  border-radius: 10px;
  padding: 20px;
  margin: 5px;
  width: 300px;
  position: relative;
  box-shadow: ${({borderColor}: {borderColor: string}) => '0 0 5px 0 ' + borderColor};
  transition: box-shadow 0.3s ease-in-out, margin-left 0.3s ease-in-out, opacity 0.3s ease-in-out;
  
  
  &:hover {
    box-shadow: ${({borderColor}: {borderColor: string}) => '0 0 7.5px 0 ' + borderColor};
  }
`

export const TodoCollectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`


export const TodoCollectionMenuBtn = styled.div`
  cursor: pointer;
  position: absolute;
  right: 3px;
  top: 5px;
  width: 25px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .3s;
  
  &:hover {
    background-color: rgba(0,0,0,0.04);
  }
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

export const TodoWrapper = styled.div`
  padding: 10px 10px 0 10px;
  display: flex;
  position: absolute;

`


export const TodoAddCollectionBtn = styled.div`
  background-color: #eaf1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  height: 100%;
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