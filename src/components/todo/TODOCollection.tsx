import React from 'react';
import {TodoCollectionHeader, TodoCollectionMenuBtn, TodoCollectionWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";
import {TodoCollectionMainProps} from "./TodoCollectionFunc";
import TodoCollectionMenu from "./TODOCollectionMenu";
import {GET_TODO_TASKS} from "../../queries/queries";
import useFormatPositionElement from "../../hooks/useFormatPositionElement";
import {DragDropContext, Droppable, DropResult, ResponderProvided} from "react-beautiful-dnd";

interface TODOCollectionProps extends TodoCollectionMainProps {
}


const TODOCollection = ({
                          title,
                          color,
                          id,
                          parentTodoBoardParentId,
                        }: TODOCollectionProps) => {
  const [arrState, setArrState] = useFormatPositionElement(GET_TODO_TASKS, {
    parentTodoCollectionId: id
  }, 'todoTasks')


  return (
      <Droppable droppableId={id} type="WRAPPERTodoTask" ignoreContainerClipping>
        {(provided, snapshot) => {
          return (
        <TodoCollectionWrapper ref={provided.innerRef} {...provided.droppableProps} borderColor={color}>
          <TodoCollectionMenuBtn>
            <TodoCollectionMenu color={color} id={id} parentId={parentTodoBoardParentId} name={title}/>
          </TodoCollectionMenuBtn>
          <TodoCollectionHeader>
            <Typography variant="h6">
              {title}
            </Typography>
          </TodoCollectionHeader>
          <TodoAddTask parentTodoCollectionId={id} countItems={arrState.length || 0}/>
          <TodoTasksCollection provided={provided} parentTodoCollectionId={id} todoTasks={arrState}/>
        </TodoCollectionWrapper>
          )}}
      </Droppable>
  )
};


export default TODOCollection;