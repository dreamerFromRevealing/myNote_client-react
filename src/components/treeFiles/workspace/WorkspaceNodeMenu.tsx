import React, {FC} from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, MenuItem} from "@mui/material";
import useDeleteFile from "../../../hooks/CRUD/useDeleteFile";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import {openModal} from "../../../store/modalSlice/modalSlice";
import useDeleteWorkspace from "../../../hooks/WorkspaceCRUD/useDeleteWorkspace";


interface WorkspaceNodeMenuProps {
  id: string;
}

const WorkspaceNodeMenu: FC<WorkspaceNodeMenuProps> = ({id}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const deleteWorkspace = useDeleteWorkspace()
  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: any) => {
    e.stopPropagation()
    setAnchorEl(null);
  };

  const handleCreateFile = (e: React.MouseEvent<HTMLElement>, type: string) => {
    dispatch(openModal({
      modalType: 'create',
      modalProps: {id: null, parentWorkspaceId: id}
    }))
    handleClose(e);
  };

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'edit-workspace',
      modalProps: {id}
    }))
    handleClose(e)
  };


  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    deleteWorkspace(id)
    handleClose(e)
  };

  return (
    <div>
      <Box sx={{display: 'flex', alignItems: 'center', mr: 1}} onClick={handleClick}>
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

        <MenuItem onClick={e => handleCreateFile(e, 'Document')}>Создать</MenuItem>
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </div>
  );
};

export default WorkspaceNodeMenu;