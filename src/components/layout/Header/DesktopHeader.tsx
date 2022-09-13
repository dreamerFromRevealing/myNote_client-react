import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {HeaderProps} from "./Header";
import FileMenu from "./menus/FileMenu";
import {Grid} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

const DesktopHeader: FC<HeaderProps> = ({pages}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link to='/'>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
        >
          <img src='/img/sun.svg' width={48} height={48} alt={'sun'}/>
        </Typography>
      </Link>

      <Grid container sx={{justifyContent: {xs: 'flex-end', sm: 'flex-start'}}}>
        <Grid item xs={6} sx={{display: {xs: 'none', sm: 'flex'}}}>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleClick}
                sx={{my: 2, color: 'white', display: 'block'}}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {page.name}
              </Button>
            ))}

            <FileMenu
              handleClose={handleClose}
              anchorEl={anchorEl}
              open={open}
            />
          </Box>
        </Grid>
       <Grid  item xs={12} sm={6}>
         <Grid
           height='100%'
           alignItems="center"
           container
           direction="row-reverse"
         >

         </Grid>
       </Grid>
      </Grid>

    </>
  );
};

export default DesktopHeader;