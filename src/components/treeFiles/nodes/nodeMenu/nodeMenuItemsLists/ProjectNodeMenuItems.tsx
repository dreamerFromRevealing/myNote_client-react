import React from 'react';
import LayoutNodeMenu from '../LayoutNodeMenu';
import {ItemsNodeMenuProps} from "../ItemsNodeMenu";
import {MenuItem} from "@mui/material";

const ProjectNodeMenuItems = ({close, handleCreateFile, handleEdit, handleDelete}: ItemsNodeMenuProps) => {

  return (
    <LayoutNodeMenu close={close}>
      <MenuItem onClick={e => handleCreateFile(e)}>Создать</MenuItem>
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
    </LayoutNodeMenu>
  );
};

export default ProjectNodeMenuItems;