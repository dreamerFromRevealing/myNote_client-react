import React, {FC, useState} from 'react';
import {MenuItem} from "@mui/material";
import useDeleteFile from "../../../hooks/CRUD/useDeleteFile";
import {useDispatch} from "react-redux";
import {openModal} from "../../../store/modalSlice/modalSlice";
import LayoutNodeMenu from "../../layout/layoutNodeMenu/LayoutNodeMenu";

interface NodeMenuProps {
  type: string;
  id: string;
  parentWorkspaceId?: string;
}

const NodeMenu: FC<NodeMenuProps> = ({type, id, parentWorkspaceId}) => {
  const deleteFile = useDeleteFile(type, parentWorkspaceId)
  const dispatch = useDispatch()
  const [close, setClose] = useState<any>(false)

  const handleCreateFile = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'create',
      subtype: 'file',
      modalProps: {id, parentWorkspaceId, type}
    }))
    setClose(e);
  };

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'edit',
      subtype: 'file',
      modalProps: {
        id,
        type
      }
    }))
    setClose(e)
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    deleteFile(id)
    setClose(e)
  };

  return (
    <LayoutNodeMenu close={close}>
      {type === 'Folder'  && <MenuItem onClick={e => handleCreateFile(e)}>Создать</MenuItem>}
      <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
    </LayoutNodeMenu>

  );
};

export default NodeMenu;