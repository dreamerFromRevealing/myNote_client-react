import React, {FC} from 'react';
import {Divider, List, ListItem, Menu, MenuList, Paper, useMediaQuery} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {switchSaveDocument} from "../../../../store/fileSlice/fileSlice";
import {useDispatch} from "react-redux";

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
              <MenuItem onClick={handleSaveDocument}>Save document</MenuItem>
              <MenuItem>Create root folder</MenuItem>
            </MenuList>
          </Paper>
        </Menu>
        :
        <List>
          <ListItem button onClick={handleSaveDocument}>Save document</ListItem>
          <Divider />
          <ListItem button >Create root folder</ListItem>
          <Divider />
        </List>
      }
    </>

  );
};

export default FileMenu;