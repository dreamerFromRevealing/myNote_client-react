import {TodoAddCollectionBtn, TodoBoardWrapper} from "./styles";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export const TODONewCollection = () => {
  return (
    <TodoBoardWrapper borderColor={'#30d5c8'}>
      <TodoAddCollectionBtn>
        <AddIcon color="success"/>
      </TodoAddCollectionBtn>
    </TodoBoardWrapper>
  )
}