import React, {FC, useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_TREE_BY_WORKSPACE_ID} from "../../../queries/layout";
import {Collapse, ListItemButton} from "@mui/material";
import HexagonIcon from "@mui/icons-material/Hexagon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {createFileTree} from "../../../store/fileSlice/fileSlice";
import Tree from "../Tree";
import Preloader from "../../layout/items/Preloader";

export type WorkspaceItemProps = {
  workspace: {
    _id: string,
    title: string,
    __typename: string
  }
};

const WorkspaceItem: FC<WorkspaceItemProps> = ({workspace, ...other}) => {
  const [getFiles, {loading, data}] = useLazyQuery(GET_TREE_BY_WORKSPACE_ID)
  const [open, setOpen] = useState(false);
  const tree = useSelector((state: any) => state.file.tree[workspace.title])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!data) dispatch(createFileTree({...data, title: workspace.title}))
  }, [data, dispatch])

  const handleGetFiles = () => {
    setOpen(!open)
    getFiles({ variables: { parentWorkspaceId: workspace._id } })
  }

  return (
    <>
      <ListItemButton sx={{p: 0}} onClick={handleGetFiles}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemIcon sx={{minWidth: 'auto', mr: 1}}>
          <HexagonIcon sx={{color: '#3e6efc'}}/>
        </ListItemIcon>
        <ListItemText primary={workspace.title}/>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {loading ? <Preloader/> : tree && <Tree data={tree}/>}
      </Collapse>
    </>

  );
};

export default WorkspaceItem;