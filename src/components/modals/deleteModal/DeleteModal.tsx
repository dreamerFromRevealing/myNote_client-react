import React, {useEffect} from 'react';
import {EditModalProps} from "../editModals/editFileModal/EditFileModal";
import useDeleteFile from "../../../hooks/CRUD/useDeleteFile";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Preloader from "../../layout/items/Preloader";
import {closeModal} from "../../../store/modalSlice/modalSlice";
import {useDispatch} from "react-redux";

interface DeleteModalProps extends EditModalProps {
  parentWorkspaceId: string;
  name: string;
}

const DeleteModal = ({id, type, parentWorkspaceId, name}: DeleteModalProps) => {
  const [deleteFile, loading, data] = useDeleteFile(type, parentWorkspaceId)
  const dispatch = useDispatch()

  const handleDelete = () => {
    deleteFile(id)
  };

  useEffect(() => {
    if (data) dispatch(closeModal())
  }, [data])

  return (
    <div>
      {loading ?
      <Preloader/> :
      (
        <>
          <div>
            Вы действительно хотите удалить <b>{type}</b> с именем <b>{name}</b>?
          </div>
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type={'submit'} onClick={handleDelete} variant="outlined">Удалить</Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default DeleteModal;