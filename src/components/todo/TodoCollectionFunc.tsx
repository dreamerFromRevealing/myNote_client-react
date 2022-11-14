import React from 'react';
import TODOCollection from "./TODOCollection";

export interface TodoCollectionFuncProps {
  title: string;
  color: string;
  id: string;
  parentTodoBoardParentId: string;
}


const TodoCollectionFunc = ({title, color, id, parentTodoBoardParentId}: TodoCollectionFuncProps) => {

  return (
    <TODOCollection
      title={title}
      color={color}
      id={id}
      parentTodoBoardParentId={parentTodoBoardParentId}
    />
  );
};

export default TodoCollectionFunc;