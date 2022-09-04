import React, {FC} from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, MenuItem} from "@mui/material";
import useDeleteFile from "../../hooks/CRUD/useDeleteFile";


interface NodeMenuProps {
  onRename: (boolean: boolean) => void;
  setCreateComponent: (string: string) => void;
  isFolder: boolean;
  id: string;
}

const NodeMenu: FC<NodeMenuProps> = ({onRename, setCreateComponent, isFolder, id}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const deleteFile = useDeleteFile()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateFile = (type: string) => {
    setCreateComponent(type)
    handleClose();
  };

  const handleRename = () => {
    onRename(true);
    handleClose()
  };


  const handleDelete = () => {
    deleteFile(isFolder, id)
    handleClose()
  };

  return (
    <div>
      <div onClick={handleClick}>
        <MoreVertIcon/>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        {isFolder && <MenuItem onClick={() => handleCreateFile('document')}>Создать документ</MenuItem>}
        {isFolder && <MenuItem onClick={() => handleCreateFile('folder')}>Создать папку</MenuItem>}
        <MenuItem onClick={handleRename}>Переименовать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </div>
  );
};

export default NodeMenu;