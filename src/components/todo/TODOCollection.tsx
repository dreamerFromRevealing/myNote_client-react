import React from 'react';
import {TodoCollectionHeader, TodoCollectionMenuBtn, TodoCollectionWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";
import {TodoCollectionMainProps} from "./TodoCollectionFunc";
import TodoCollectionMenu from "./TODOCollectionMenu";

interface TODOCollectionProps extends TodoCollectionMainProps {
}


const TODOCollection = ({
                          title,
                          color,
                          id,
                          parentTodoBoardParentId,
                        }: TODOCollectionProps) => (

  <TodoCollectionWrapper borderColor={color}>
    <TodoCollectionMenuBtn>
      <TodoCollectionMenu color={color} id={id} parentId={parentTodoBoardParentId} name={title}/>
    </TodoCollectionMenuBtn>
    <TodoCollectionHeader>
      <Typography variant="h6">
        {title}
      </Typography>
    </TodoCollectionHeader>
    <TodoAddTask parentTodoCollectionId={id}/>
    <TodoTasksCollection parentTodoCollectionId={id}/>
  </TodoCollectionWrapper>

);


export default TODOCollection;