import React, {FC} from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, MenuItem} from "@mui/material";
import useDeleteFile from "../../../hooks/CRUD/useDeleteFile";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import {openModal} from "../../../store/modalSlice/modalSlice";


interface NodeMenuProps {
  type: string;
  id: string;
  parentWorkspaceId?: string;
}

const NodeMenu: FC<NodeMenuProps> = ({type, id, parentWorkspaceId}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const deleteFile = useDeleteFile(type, parentWorkspaceId)
  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: any) => {
     e.stopPropagation()
    setAnchorEl(null);
  };

  const handleCreateFile = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'create',
      subtype: 'file',
      modalProps: {id, parentWorkspaceId, type}
    }))
    handleClose(e);
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
    handleClose(e)
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    deleteFile(id)
    handleClose(e)
  };

  return (
    <div>
      <Box sx={{display: 'flex', alignItems: 'center'}} onClick={handleClick}>
        <MoreVertIcon/>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={e => handleClose(e)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        {type === 'Folder'  && <MenuItem onClick={e => handleCreateFile(e)}>Создать</MenuItem>}
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </div>
  );
};

export default NodeMenu;