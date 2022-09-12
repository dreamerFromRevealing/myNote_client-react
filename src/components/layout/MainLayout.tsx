import React, {FC, PropsWithChildren, useState} from 'react'
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

const MainLayout: FC<PropsWithChildren> = ({children}) => {
  const {loading, data} = useQuery(GET_WORKSPACES)
  const [open, setOpen] = useState(true)

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
          <MainLayoutHideLeftSideBtn open={open} onClick={handleDrawerSwitch}/>
          {children}
        </MainLayoutRightSide>
      </MainLayoutRow>
      <Footer/>
      <MainAlert/>
      <MainModal/>
    </MainLayoutWrapper>
  )
}

export default MainLayout