import React from 'react';
import LayoutNodeMenu from "../treeFiles/nodes/nodeMenu/LayoutNodeMenu";
import {MenuItem} from "@mui/material";

const TodoCollectionMenu = () => {
  const handleDelete = () => {

  }

  const handleEdit = () => {

  }

  return (
    <LayoutNodeMenu close={false}>
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
    </LayoutNodeMenu>
  );
};

export default TodoCollectionMenu;