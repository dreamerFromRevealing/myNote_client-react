import React, {FC, useState} from 'react';
import {DATAType} from "../../../types/types_data_from_server/dataType";
import NodeWithChild from "./NodeWithChild";
import NodeWithoutChild from "./NodeWithoutChild";
import NodeNewComponent from "./NodeNewComponent";

interface NodeProps {
  item: DATAType,
  level: number,
  onToggle: false | (() => void),
  selected: boolean,
  isFolder: boolean,
  draggable?: boolean,
}

export interface NodeChildProps extends NodeProps {
  setRename: (rename: boolean) => void;
  setCreateComponent: (string: string) => void;
  rename: boolean;
}

const Node: FC<NodeProps> = ({item, level, onToggle, selected, isFolder}) => {
  const [rename, setRename] = useState(false)

  return (
    <>
      {/*{ onToggle ?*/}
      {/*  <NodeWithChild*/}
      {/*    item={item}*/}
      {/*    level={level}*/}
      {/*    onToggle={onToggle}*/}
      {/*    rename={rename}*/}
      {/*    setRename={setRename}*/}
      {/*    isFolder={isFolder}*/}
      {/*    selected={selected}*/}
      {/*  />*/}
      {/*  :*/}
      {/*  <NodeWithoutChild*/}
      {/*    rename={rename}*/}
      {/*    setRename={setRename}*/}
      {/*    isFolder={isFolder}*/}
      {/*    selected={selected}*/}
      {/*    item={item}*/}
      {/*    level={level}*/}
      {/*    onToggle={onToggle}*/}
      {/*  />*/}
      {/*}*/}
      {/*{createComponent && <NodeNewComponent parenId={item._id} setCreateComponent={setCreateComponent} createComponent={createComponent}/>}*/}
    </>
  );
};

export default Node;