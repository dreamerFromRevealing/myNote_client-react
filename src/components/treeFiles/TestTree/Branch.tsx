import React, {FC, useState} from 'react';
import Node from '../Nodes/Node';
import {DATAType} from "../../../types/types_data_from_server/dataType";

interface BranchProps {
  item: DATAType,
  level: number
}

const Branch: FC<BranchProps> = ({item, level}) => {
  const [selected, setSelected] = useState(false)
  console.log('Branch item', item)
  const hasChildren = !!item.children && item.children.length > 0
  const isFolder = !!item.children

  const renderBranches = () => {
    /**
     * Так теперь надо объяснение для этой функции
     *
     * 1. Первое, что я понял, что ты тут делаешь, это проверяешь, есть ли у элемента дети и если да то отображаешь их
     * и рендеришь космпонент.
     * По сути схема такая же как и в материал компоненте надо только немного ее переделать...
     */
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