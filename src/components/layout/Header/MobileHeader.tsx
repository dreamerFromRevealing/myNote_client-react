import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {HeaderProps} from "./Header";
import Drawer from '@mui/material/Drawer';
import MobileMenu from "./menus/MobileMenu";

const MobileHeader: FC<HeaderProps> = ({pages}) => {
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown') {
      if ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') {
        return;

      }
    }

    setState({...state, right: open});
  };


  return (
    <>
      <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
        <IconButton
          size="large"
          aria-label="account of current user"
          onClick={toggleDrawer(true)}
          color="inherit"
        >
          <MenuIcon/>
        </IconButton>
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer(false)}
        >
          <MobileMenu pages={pages} toggleDrawer={toggleDrawer}/>
        </Drawer>
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
      />
    </>

  );
};

export default MobileHeader;