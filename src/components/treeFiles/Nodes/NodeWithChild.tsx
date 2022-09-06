import React, {FC} from 'react';
import {NodeItem, NodeRow, NodeWrapper} from "../styles";
import {AiOutlineDown, AiOutlineFolder, AiOutlineUp} from "react-icons/ai";
import NodeText from "../nodeText/NodeText";
import NodeMenu from "../NodeMenu";
import {NodeChildProps} from "./Node";

export interface NodeWithChildProps extends NodeChildProps {
  onToggle: (() => void);
}

const NodeWithChild: FC<NodeWithChildProps> = (
  {
    item,
    level,
    onToggle,
    selected,
    isFolder,
    setRename,
    rename,
    setCreateComponent
  }) => {
  return (
    <NodeWrapper level={level}>
      <NodeItem>
        <NodeRow>
          <AiOutlineFolder size={24}/>
          <NodeText
            isFolder={isFolder}
            id={item._id}
            onRename={setRename}
            rename={rename}
            title={item.title || ''}
          />
          {selected ? <AiOutlineDown onClick={onToggle}/> : <AiOutlineUp onClick={onToggle}/>}
        </NodeRow>
        <NodeMenu id={item._id} isFolder={true} onRename={setRename}/>
      </NodeItem>
    </NodeWrapper>
  );
};

export default NodeWithChild;