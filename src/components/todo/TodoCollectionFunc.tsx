import React, {DragEvent} from 'react';
import TODOCollection from "./TODOCollection";
import {Draggable} from "react-beautiful-dnd";

export interface TodoCollectionMainProps {
  title: string;
  color: string;
  id: string;
  parentTodoBoardParentId: string;

}

export interface TodoCollectionFuncProps extends TodoCollectionMainProps{
  index: number;
}

const TodoCollectionFunc = ({title, color, id, parentTodoBoardParentId, index}: TodoCollectionFuncProps) => {


  return (
    <Draggable draggableId={"drag-id-" + id} index={index}>
      {provided => (
        <div
          key={id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TODOCollection
            title={title}
            color={color}
            id={id}
            parentTodoBoardParentId={parentTodoBoardParentId}
          />
        </div>
        )}
    </Draggable>
  );
};

export default TodoCollectionFunc;