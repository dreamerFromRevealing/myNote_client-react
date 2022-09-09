import React, {FC, PropsWithChildren, useEffect, useState} from 'react'
import Tree from "../treeFiles/Tree"
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
import {GET_TREE} from "../../queries/layout"
import {drawerWidth} from './items/LayoutContent'
import MainAlert from "../alert/MainAlert";
import {useDispatch, useSelector} from "react-redux";
import {createFileTree} from "../../store/fileSlice/fileSlice";
import Preloader from "./items/Preloader";
import MainModal from "../modals/mainModal/MainModal";

const MainLayout: FC<PropsWithChildren> = ({children}) => {
  const {loading, data} = useQuery(GET_TREE)
  const dispatch = useDispatch()
  const tree = useSelector((state: any) => state.file.tree)
  const [open, setOpen] = useState(true)

  const handleDrawerSwitch = () => {
    setOpen(prevOpen => !prevOpen)
  }

  useEffect(() => {
    if (!!data) dispatch(createFileTree(data))
  }, [data, dispatch])


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
          {loading ? <Preloader/> : <Tree data={tree}/>}
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