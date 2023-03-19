import React, {useEffect, useState} from 'react';
import {useLazyQuery} from "@apollo/client";
import {GET_TREE_BY_PROJECT_ID} from "../../../queries/layout";
import {useDispatch, useSelector} from "react-redux";
import {Collapse, ListItemButton} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Preloader from "../../layout/items/Preloader";
import {createFileTree} from "../../../store/fileSlice/fileSlice";
import Tree from "../Tree";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ProjectNodeMenu from "./ProjectNodeMenu";

const ProjectItem = ({project}: { project: any }) => {
  const [getFiles, {loading, data}] = useLazyQuery(GET_TREE_BY_PROJECT_ID)
  const [open, setOpen] = useState(false);
  const tree = useSelector((state: any) => state.file.tree[project.title])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!data) dispatch(createFileTree({...data, title: project.title}))
  }, [data, dispatch])

  const handleGetFiles = () => {
    setOpen(!open)
    getFiles({variables: {parentProjectId: project._id}})
  }

  return (
    <>
      <ListItemButton sx={{p: 0, ml: 1}} onClick={handleGetFiles}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemIcon sx={{minWidth: 'auto', mr: 1}}>
          <DesignServicesIcon sx={{color: '#a8840a'}}/>
        </ListItemIcon>
        <ListItemText primary={project.title}/>
        <ProjectNodeMenu id={project._id}/>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {loading ? <Preloader/> : tree && <Tree data={tree}/>}
      </Collapse>
    </>
  );
};

export default ProjectItem;