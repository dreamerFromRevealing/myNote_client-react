import React, {FC} from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, MenuItem} from "@mui/material";
import useDeleteFile from "../../../hooks/CRUD/useDeleteFile";
import {useDispatch} from "react-redux";
import {setCreateComponent} from "../../../store/appSlice/appSlice";
import Box from "@mui/material/Box";
import {openModal} from "../../../store/modalSlice/modalSlice";


interface NodeMenuProps {
  isFolder?: boolean;
  id: string;
}

const NodeMenu: FC<NodeMenuProps> = ({isFolder, id}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const deleteFile = useDeleteFile()
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
    dispatch(setCreateComponent({type, parenId: id}))
    handleClose(e);
  };

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openModal({
      modalType: 'edit',
      modalProps: {
        id,
        isFolder
      }
    }))
    handleClose(e)
  };


  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    deleteFile(!!isFolder, id)
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

        {isFolder && <MenuItem onClick={e => handleCreateFile(e,'Document')}>Создать документ</MenuItem>}
        {isFolder && <MenuItem onClick={e => handleCreateFile(e,'Folder')}>Создать папку</MenuItem>}
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </div>
  );
};

export default NodeMenu;