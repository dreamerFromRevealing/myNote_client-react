import React from 'react';
import {MenuItem} from "@mui/material";
import {ItemsNodeMenuProps} from "../ItemsNodeMenu";
import LayoutNodeMenu from "../LayoutNodeMenu";

const ClassicNodeMenuItems = ({close, handleEdit, handleDelete}: ItemsNodeMenuProps) =>  (
  <LayoutNodeMenu close={close}>
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
  </LayoutNodeMenu>
  );

export default ClassicNodeMenuItems;