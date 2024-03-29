import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import TreeItem, {TreeItemProps} from '@mui/lab/TreeItem';
import {SvgIconProps} from '@mui/material/SvgIcon';
import NodeIcon from "./nodes/NodeIcon";
import NodeMenu from "./nodes/nodeMenu/NodeMenu";
import NodeText from "./nodes/NodeText";
import {useNavigate} from "react-router-dom";

export type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelText: string;
  type: string;
  parentProjectId?: string;
};

const StyledTreeItem: FC<StyledTreeItemProps> = (props) => {
  const {
    bgColor,
    color,
    labelText,
    type,
    parentProjectId,
    ...other
  } = props;
  const navigate = useNavigate();

  const getDocument = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    let url = ''
    switch (type) {
      case 'Document': url = '/doc/' + other.nodeId
        break;
      case 'TodoBoard': url = '/todo/' + other.nodeId
        break;
      case 'Log': url = '/log/' + other.nodeId
        break;
    }

    navigate(url)
  }


  if (type === 'Folder') {
    return (
      <TreeItem
        label={
          <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr: 0}}>
            <NodeIcon type={type}/>
            <NodeText labelText={labelText}/>
            <NodeMenu name={labelText} parentProjectId={parentProjectId} id={other.nodeId} type={type}/>
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
            <NodeIcon  type={type}/>
            <NodeText  labelText={labelText}/>
            </Box>
            <NodeMenu name={labelText} parentProjectId={parentProjectId} id={other.nodeId} type={type}/>
          </Box>
        }
        {...other}
      />
    );
  }
}

export default StyledTreeItem;