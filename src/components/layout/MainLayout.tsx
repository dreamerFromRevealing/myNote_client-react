import React, {FC, PropsWithChildren, useEffect, useState} from 'react'
import {
  MainLayoutHideLeftSideBtn,
  MainLayoutLeftSide,
  MainLayoutRightSide,
  MainLayoutRow,
  MainLayoutWrapper
} from "./styles"
import {useQuery} from "@apollo/client"
import Header from "./Header/Header"
import Footer from "./Footer"
import {drawerWidth} from './items/LayoutContent'
import MainAlert from "../alert/MainAlert";
import Preloader from "./items/Preloader";
import MainModal from "../modals/mainModal/MainModal";
import Workspace from "../treeFiles/workspace/Workspace";
import {GET_WORKSPACES} from "../../queries/workspace";
import {Outlet, useParams} from "react-router-dom";
import Box from "@mui/material/Box";



const MainLayout: FC<PropsWithChildren> = (props) => {
  const {loading, data} = useQuery(GET_WORKSPACES)
  const [open, setOpen] = useState(true)
  const params = useParams();
  const [isOverflowHidden, setIsOverflowHidden] = useState(true)

  useEffect(() => {
      if (params.hasOwnProperty('todoId')) {
        setIsOverflowHidden(false)
      }
    },
    [])


  const handleDrawerSwitch = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <MainLayoutWrapper>
      <Header/>
      <MainLayoutRow>
        <MainLayoutLeftSide
          width={drawerWidth}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {
            loading ?
              <Preloader/> :
            <Workspace workspaces={data?.workspaces}/>
          }
        </MainLayoutLeftSide>
        <MainLayoutRightSide open={open}>
          <Box sx={{position: 'relative'}}>
            <MainLayoutHideLeftSideBtn open={open} onClick={handleDrawerSwitch}/>
            <Outlet />
          </Box>
        </MainLayoutRightSide>
      </MainLayoutRow>
      <Footer/>
      <MainAlert/>
      <MainModal/>
    </MainLayoutWrapper>
  )
}

export default MainLayout