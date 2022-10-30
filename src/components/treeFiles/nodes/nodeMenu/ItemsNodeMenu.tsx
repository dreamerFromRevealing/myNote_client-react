import React from 'react';
import ClassicNodeMenuItems from "./nodeMenuItemsLists/ClassicNodeMenuItems";
import NodeMenuItemsWithCreate from "./nodeMenuItemsLists/NodeMenuItemsWithCreate";
import TodoBoxNodeMenuItems from "./nodeMenuItemsLists/TODOBoxNodeMenuItems";

export interface ItemsNodeMenuProps {
  close?: any,
  type?: string,
  handleCreateFile?: any,
  handleEdit: any,
  handleDelete: any
}

const ItemsNodeMenu = ({close, type, handleCreateFile, handleEdit, handleDelete}: ItemsNodeMenuProps) => {
  switch (type) {
    case 'Folder':
      return (
        <NodeMenuItemsWithCreate
          close={close}
          handleCreateFile={handleCreateFile}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )
    case 'TodoBox':
      return (
        <TodoBoxNodeMenuItems
          close={close}
          handleCreateFile={handleCreateFile}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )
    default:
      return (
        <ClassicNodeMenuItems
          close={close}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )
  }
};

export default ItemsNodeMenu;