import React, {FC} from 'react';
import {Divider, List, ListItem, Menu, MenuList, Paper, useMediaQuery} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
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


  const handleCreateWorkspace = () => {
    dispatch(openModal({modalType: 'create', subtype: 'Workspace'}))
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
              <MenuItem onClick={handleCreateWorkspace}>Создать рабочее пространство</MenuItem>
            </MenuList>
          </Paper>
        </Menu>
        :
        <List>
          <ListItem onClick={handleCreateWorkspace} button >Создать рабочее пространство</ListItem>
          <Divider />
        </List>
      }
    </>

  );
};

export default FileMenu;