import {TodoAddCollectionBtn, TodoCollectionWrapper} from "./styles";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {openModal} from "../../store/modalSlice/modalSlice";
import {useDispatch} from "react-redux";

export const TODONewCollection = ({parentTodoBoardParentId, countItems}: {parentTodoBoardParentId?: string, countItems: number}) => {
const dispatch = useDispatch()

  const handleCallCreateCollectionModal = () => {
    dispatch(openModal({
      modalType: 'create',
      subtype: 'TodoCollection',
      modalProps: {parentTodoBoardParentId, countItems}
    }))
  }

  return (
    <TodoCollectionWrapper borderColor={'#30d5c8'}>
      <TodoAddCollectionBtn onClick={handleCallCreateCollectionModal}>
        <AddIcon color="success"/>
      </TodoAddCollectionBtn>
    </TodoCollectionWrapper>
  )
}