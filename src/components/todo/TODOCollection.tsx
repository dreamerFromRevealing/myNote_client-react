import React, {DragEvent} from 'react';
import {TodoCollectionHeader, TodoCollectionMenuBtn, TodoCollectionWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";
import {TodoCollectionFuncProps} from "./TodoCollectionFunc";
import TodoCollectionMenu from "./TODOCollectionMenu";

interface TODOCollectionProps extends TodoCollectionFuncProps {
  dragStartHandler: (e: DragEvent<HTMLDivElement>, card: TodoCollectionFuncProps) => void;
  dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void;
  dragEndHandler: (e: DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
  dropHandler: (e: DragEvent<HTMLDivElement>, card: TodoCollectionFuncProps) => void;
}


const TODOCollection = ({
                          title,
                          color,
                          id,
                          parentTodoBoardParentId,
                          dragStartHandler,
                          dragLeaveHandler,
                          dragEndHandler,
                          dragOverHandler,
                          dropHandler
                        }: TODOCollectionProps) => (
                          // todo remove ts-ignore
  // @ts-ignore
  <TodoCollectionWrapper
    onDragStart={dragStartHandler}
    onDragLeave={dragLeaveHandler}
    onDragEnd={dragEndHandler}
    onDragOver={dragOverHandler}
    onDrop={dropHandler}
    draggable={true}
    borderColor={color}
  >
    <TodoCollectionMenuBtn>
      <TodoCollectionMenu color={color} id={id} parentId={parentTodoBoardParentId} name={title}/>
    </TodoCollectionMenuBtn>
    <TodoCollectionHeader>
      <Typography variant="h6">
        {title}
      </Typography>
    </TodoCollectionHeader>
    <TodoAddTask title={title}/>
    <TodoTasksCollection/>
  </TodoCollectionWrapper>

);


export default TODOCollection;