import styled from "styled-components"
import {TextCustomScroll} from "../../styles/styled-components/CustomScroll";
import {Drawer, Grid} from "@mui/material";
import LayoutContent from "./items/LayoutContent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "@mui/material/Button";

export const MainLayoutWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const MainLayoutRow = styled.div`
  flex: 1;
  display: flex;
  height: calc(100% - 120px);
`

export const MainLayoutLeftSide = styled(Drawer)`
  width: ${(props: {width: number}) => props.width + 'px'};
  flex-shrink: 0;
  position: relative;
  
  & .MuiDrawer-paper {
    width: ${(props: {width: number}) => props.width + 'px'};
    box-sizing: border-box;
    position: absolute;
    ${TextCustomScroll}
  }
  `

export const MainLayoutRightSide = styled(LayoutContent)`
  flex: 1;
  position: relative;
  padding: 0;
  overflow: hidden;
`

export const MainLayoutFooter = styled.div`
  flex: 0 0 50px;
  background-color: #556CD6;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  `

export const MainLayoutHideLeftSideBtn = styled(ArrowBackIcon)`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  border-radius: 50%;
  left: '5px';
  z-index: 1201;
  cursor: pointer;
  transform: ${({open}: {open: boolean}) => open ? '' : 'rotate(180deg)'};
  transition: transform 0.3s ease-in-out;
  `

export const LayoutViewSwitcherWrapper = styled(Grid)`
  width: 167px;
  `

export const LayoutViewSwitcherBtn = styled(Button)`
  min-width: auto;
  border-color: #fff;
  svg { 
    fill: #fff;
  }
  
  &:hover {
    background-color: #fff;
    svg { 
      fill: #556CD6;
    }
  }
  `

