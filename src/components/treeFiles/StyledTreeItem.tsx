import * as React from 'react';
import {FC, useState} from 'react';
import Box from '@mui/material/Box';
import TreeItem, {TreeItemProps} from '@mui/lab/TreeItem';
import {SvgIconProps} from '@mui/material/SvgIcon';
import NodeIcon from "./Nodes/NodeIcon";
import NodeMenu from "./Nodes/NodeMenu";
import NodeText from "./Nodes/NodeText";
import {useNavigate} from "react-router-dom";

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelText: string;
  type?: string;
};

const StyledTreeItem: FC<StyledTreeItemProps> = (props) => {
  const {
    bgColor,
    color,
    labelText,
    type,
    ...other
  } = props;
  const [rename, setRename] = useState(false)
  const navigate = useNavigate();

  const getDocument = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate('/doc/' + other.nodeId)
  }


  if (type === 'Folder') {
    return (
      <TreeItem
        label={
          <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr: 0}}>
            <NodeIcon type={type}/>
            <NodeText rename={rename} onRename={setRename} labelText={labelText} isFolder
                      id={other.nodeId}/>
            <NodeMenu id={other.nodeId} isFolder onRename={setRename}/>
          </Box>
        }
        {...other}
      />
    );
  } else {
    return (
      <TreeItem
        label={
          <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr: 0}}>
            <Box sx={{display: 'flex', alignItems: 'center', width: 0.9}} onClick={getDocument}>
            <NodeIcon type={type}/>
            <NodeText rename={rename} onRename={setRename} labelText={labelText}
                      id={other.nodeId}/>
            </Box>
            <NodeMenu id={other.nodeId} onRename={setRename}/>
          </Box>
        }
        {...other}
      />
    );
  }
}

export default StyledTreeItem;