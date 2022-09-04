import React, {FC, useState} from 'react';
import Node from './Nodes/Node';
import {DATAType} from "../../types/types_data_from_server/dataType";

interface BranchProps {
  item: DATAType,
  level: number
}

const Branch: FC<BranchProps> = ({item, level}) => {
  const [selected, setSelected] = useState(false)

  const hasChildren = !!item.children && item.children.length > 0
  const isFolder = !!item.children

  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1

      return item.children && item.children.map((child: DATAType) => {
        return <Branch key={child._id} item={child} level={newLevel}/>
      })
    }

    return null
  }

  const toggleSelected = () => {
    setSelected((prev: boolean) => !prev)
  }

  return (
    <>
      <Node
        selected={selected}
        item={item}
        level={level}
        onToggle={hasChildren && toggleSelected}
        isFolder={isFolder}
      />

      {selected && renderBranches()}
    </>
  );
};

export default Branch;