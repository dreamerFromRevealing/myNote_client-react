import React, {FC} from 'react';
import {DATAType} from "../../types/types_data_from_server/dataType";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export interface TreeProps {
  data: DATAType[]
}

const Tree: FC<TreeProps> = ({data}) => {
  /**
   * Разбор работы этого дерева
   * тут идет я бы сказал рекурсивное разворачивание дерева, надо провреитьт получитсь ли это с поим массиваом
   * а для начала мы скопируем его сюда и просто заменим свое дерево на это.
   * @param nodes
   */
  const renderTree = (nodes: any) => {
    if (Array.isArray(nodes)) {
      return (
        <TreeItem key={'root'} nodeId={'root'} label={'Parent'}>
          {Array.isArray(nodes)
            ? nodes.map((node: any) => renderTree(node))
            : null}
        </TreeItem>
      )
    }
    return (
      <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.title}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node: any) => renderTree(node))
          : null}
      </TreeItem>
    )
  };

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon/>}
      // sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export default Tree;