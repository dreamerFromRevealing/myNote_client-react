import React from 'react';
import {ItemsNodeMenuProps} from "../ItemsNodeMenu";
import LayoutNodeMenu from "../LayoutNodeMenu";
import {MenuItem} from "@mui/material";

const TodoBoxNodeMenuItems = ({close, handleCreateFile, handleEdit, handleDelete}: ItemsNodeMenuProps) => {
  return (
    <LayoutNodeMenu close={close}>
      <MenuItem onClick={e => handleCreateFile(e)}>Создать доску задач</MenuItem>
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
    </LayoutNodeMenu>
  );
};

export default TodoBoxNodeMenuItems;