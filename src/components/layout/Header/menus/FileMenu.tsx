import React, {FC} from 'react';
import {Divider, List, ListItem, Menu, MenuList, Paper, useMediaQuery} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {switchSaveDocument} from "../../../../store/fileSlice/fileSlice";
import {useDispatch} from "react-redux";
import {openModal} from "../../../../store/modalSlice/modalSlice";

interface FileMenuProps {
  anchorEl?: null | HTMLElement,
  open?: boolean,
  handleClose?: () => void
}

const FileMenu: FC<FileMenuProps> = ({anchorEl, open, handleClose}) => {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:899px)')

  const handleSaveDocument = () => {
    dispatch(switchSaveDocument())
  }

  const handleCreateWorkspace = () => {
    dispatch(openModal({modalType: 'create', subtype: 'workspace'}))
  }

  return (
    <>
      {matches && typeof anchorEl !== 'undefined' && typeof open !== 'undefined' && !!handleClose ?
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Paper sx={{width: 320}}>
            <MenuList dense>
              <MenuItem onClick={handleSaveDocument}>Сохранить документ</MenuItem>
              <MenuItem onClick={handleCreateWorkspace}>Создать рабочее пространство</MenuItem>
            </MenuList>
          </Paper>
        </Menu>
        :
        <List>
          <ListItem button onClick={handleSaveDocument}>Сохранить документ</ListItem>
          <Divider />
          <ListItem onClick={handleCreateWorkspace} button >Создать рабочее пространство</ListItem>
          <Divider />
        </List>
      }
    </>

  );
};

export default FileMenu;