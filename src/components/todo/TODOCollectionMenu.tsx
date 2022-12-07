import React, {useState} from 'react';
import LayoutNodeMenu from "../treeFiles/nodes/nodeMenu/LayoutNodeMenu";
import {MenuItem} from "@mui/material";
import {useDispatch} from "react-redux";
import {openModal} from "../../store/modalSlice/modalSlice";

const TodoCollectionMenu = ({id, parentId, name, color}: {id: string, parentId: string, name: string, color: string}) => {
  const dispatch = useDispatch()
  const [close, setClose] = useState<any>(false)

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'delete',
      modalProps: {
        id,
        type: 'TodoCollection',
        parentId,
        name
      }
    }))
    setClose(e)
  }

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'edit',
      subtype: 'TodoCollection',
      modalProps: {
        id,
        parentId,
        name,
        color
      }
    }))
    setClose(e)
  }

  return (
    <LayoutNodeMenu close={close}>
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
    </LayoutNodeMenu>
  );
};

export default TodoCollectionMenu;