import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {openModal} from "../../../../store/modalSlice/modalSlice";
import ItemsNodeMenu from "./ItemsNodeMenu";

interface NodeMenuProps {
  type: string;
  id: string;
  parentProjectId?: string;
  name: string;
}

const NodeMenu: FC<NodeMenuProps> = ({type, id, parentProjectId, name}) => {
  const dispatch = useDispatch()
  const [close, setClose] = useState<any>(false)

  const handleCreateFile = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'create',
      subtype: type,
      modalProps: {id, parentProjectId, type}
    }))
    setClose(e);
  };

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'edit',
      subtype: type,
      modalProps: {
        id,
        type,
        parentProjectId
      }
    }))
    setClose(e)
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'delete',
      subtype: type,
      modalProps: {
        id,
        type,
        parentId: parentProjectId,
        name
      }
    }))
    setClose(e)
  };

  return (
    <ItemsNodeMenu
      close={close}
      type={type}
      handleCreateFile={handleCreateFile}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      id={id}
      parentProjectId={parentProjectId}
    />
  );
};

export default NodeMenu;