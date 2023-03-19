import React from 'react';
import ClassicNodeMenuItems from "./nodeMenuItemsLists/ClassicNodeMenuItems";
import NodeMenuItemsWithCreate from "./nodeMenuItemsLists/NodeMenuItemsWithCreate";
import TodoBoxNodeMenuItems from "./nodeMenuItemsLists/TODOBoxNodeMenuItems";
import ProjectNodeMenuItems from "./nodeMenuItemsLists/ProjectNodeMenuItems";
import LogbookNodeMenu from "./nodeMenuItemsLists/LogbookNodeMenu";

export interface ItemsNodeMenuProps {
  close?: any,
  type?: string,
  handleCreateFile?: any,
  handleEdit: any,
  handleDelete: any
  id?: string
  parentProjectId?: string
}

const ItemsNodeMenu = (props: ItemsNodeMenuProps) => {
  const {close, type, handleCreateFile, handleEdit, handleDelete, id, parentProjectId} = props;

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
    case 'Project':
      return (
        <ProjectNodeMenuItems
          close={close}
          handleCreateFile={handleCreateFile}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )
    case 'Logbook':
      return (
        <LogbookNodeMenu
          close={close}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          id={id}
          parentProjectId={parentProjectId}
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