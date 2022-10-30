import React from 'react';
import LayoutNodeMenu from "./LayoutNodeMenu";
import {MenuItem} from "@mui/material";
import ClassicNodeMenuItems from "./nodeMenuItemsLists/ClassicNodeMenuItems";


export interface ItemsNodeMenuProps {
  close?: any,
  type: string,
  handleCreateFile: any,
  handleEdit: any,
  handleDelete: any

}

const ItemsNodeMenu = ({close, type, handleCreateFile, handleEdit, handleDelete}: ItemsNodeMenuProps) => {
  // тут тепреь можно порешать с типами для вывода создания файла

  return (
    <LayoutNodeMenu close={close}>
      <ClassicNodeMenuItems
        type={type}
        handleCreateFile={handleCreateFile}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </LayoutNodeMenu>
  );
};

export default ItemsNodeMenu;