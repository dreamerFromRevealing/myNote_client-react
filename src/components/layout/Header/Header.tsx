import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const pages = [
  {
    name: 'Файл',
    accordion: true
  },
];

interface Page {
  name: string,
  accordion: boolean
}

export interface HeaderProps {
  pages: Page[]
}

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <MobileHeader pages={pages}/>
          <DesktopHeader pages={pages}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;