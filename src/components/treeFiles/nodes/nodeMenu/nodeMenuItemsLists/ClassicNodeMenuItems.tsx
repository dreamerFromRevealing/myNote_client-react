import React from 'react';
import {MenuItem} from "@mui/material";
import {ItemsNodeMenuProps} from "../ItemsNodeMenu";

const ClassicNodeMenuItems = ({type, handleCreateFile, handleEdit, handleDelete}: ItemsNodeMenuProps) =>  (
    <>
      {type === 'Folder' && <MenuItem onClick={e => handleCreateFile(e)}>Создать</MenuItem>}
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
    </>
  );

export default ClassicNodeMenuItems;