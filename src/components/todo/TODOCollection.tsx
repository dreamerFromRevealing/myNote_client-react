import React from 'react';
import {TodoCollectionHeader, TodoCollectionMenuBtn, TodoCollectionWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";
import {TodoCollectionMainProps} from "./TodoCollectionFunc";
import TodoCollectionMenu from "./TODOCollectionMenu";
import {Droppable} from "react-beautiful-dnd";
import {useQuery} from "@apollo/client";
import {GET_TODO_TASKS} from "../../queries/entitis/TodoTask";

interface TODOCollectionProps extends TodoCollectionMainProps {}

const TODOCollection = ({title, color, id, parentTodoBoardParentId,}: TODOCollectionProps) => {
  const {data} = useQuery(GET_TODO_TASKS, {variables: {parentTodoCollectionId: id}})

  if (!data) return null
  return (
    <Droppable droppableId={id} type="TodoTasks" ignoreContainerClipping>
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
            <TodoAddTask parentTodoCollectionId={id} countItems={data.todoTasks.length || 0}/>
            <TodoTasksCollection provided={provided} parentTodoCollectionId={id} todoTasks={data.todoTasks}/>
          </TodoCollectionWrapper>
        )
      }}
    </Droppable>
  )
};


export default TODOCollection;