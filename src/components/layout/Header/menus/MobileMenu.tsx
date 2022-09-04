import React, {FC} from 'react';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import {HeaderProps} from "../Header";
import CloseIcon from '@mui/icons-material/Close';
import {AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import FileMenu from "./FileMenu";

interface MobileMenuProps extends HeaderProps {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

const MobileMenu: FC<MobileMenuProps> = ({pages, toggleDrawer}) => {
  // todo теперь осталось перенести туда компонент с менюшкой

  return (
    <Box
      sx={{
        width: '100vw',
        padding: '10px'
      }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{textAlign: 'right'}}>
        <CloseIcon onClick={toggleDrawer(false)}/>
      </Box>

      <Box>

        <List>
          {pages.map((item, index) => (
            <ListItem button key={item.name}>
              {
                item.accordion ?
                  <Accordion sx={{width: '100%'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                      <ListItemIcon>
                        {item.name === 'File' && <FolderIcon/>}
                      </ListItemIcon>
                      <ListItemText primary={item.name}/>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FileMenu/>
                    </AccordionDetails>
                  </Accordion>
                  :
                  <>
                    <ListItemIcon>
                      {item.name === 'File' && <FolderIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                  </>
              }
            </ListItem>
          ))}
        </List>

      </Box>
    </Box>
  );
};

export default MobileMenu;