import React, {DragEvent} from 'react';
import TODOCollection from "./TODOCollection";

export interface TodoCollectionFuncProps {
  title: string;
  color: string;
  id: string;
  parentTodoBoardParentId: string;
}

const TodoCollectionFunc = ({title, color, id, parentTodoBoardParentId}: TodoCollectionFuncProps) => {

  // Когда взяли карточку
  const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: TodoCollectionFuncProps) => {
    e.currentTarget.style.opacity = '0'

  }

  // Если вышли за пределы другой карточки
  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.marginLeft = '0px'
  }

  // Если отпустили перемещение
  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1'
  }

  // Если находимся над каким, то другим объектом
  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.marginLeft = '300px'
    e.preventDefault()

  }

  // Если отпустили карточку и расчитываем на какое-то связанное с этим действие
  const dropHandler = (e: DragEvent<HTMLDivElement>, card: TodoCollectionFuncProps) => {
    e.currentTarget.style.opacity = '1'
    e.preventDefault()

  }


  return (
    <TODOCollection
      dragStartHandler={dragStartHandler}
      dragLeaveHandler={dragLeaveHandler}
      dragEndHandler={dragEndHandler}
      dragOverHandler={dragOverHandler}
      dropHandler={dropHandler}
      title={title}
      color={color}
      id={id}
      parentTodoBoardParentId={parentTodoBoardParentId}
    />
  );
};

export default TodoCollectionFunc;