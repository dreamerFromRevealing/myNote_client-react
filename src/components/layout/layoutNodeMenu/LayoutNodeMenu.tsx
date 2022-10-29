import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu} from "@mui/material";

interface LayoutNodeMenuProps {
  children: JSX.Element | JSX.Element[] | false
  close: any
}

const LayoutNodeMenu = ({children, close}: LayoutNodeMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: any) => {
    e.stopPropagation()
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!!close) handleClose(close)
  }, [close])

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
              {children}
            </Menu>
        </div>
    );
};

export default LayoutNodeMenu;