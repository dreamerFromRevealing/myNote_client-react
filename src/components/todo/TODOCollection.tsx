import React from 'react';
import {TodoCollectionHeader, TodoCollectionMenuBtn, TodoCollectionWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";
import {TodoCollectionFuncProps} from "./TodoCollectionFunc";
import TodoCollectionMenu from "./TODOCollectionMenu";

const TODOCollection = ({title, color, id, parentTodoBoardParentId}: TodoCollectionFuncProps) => (
    <TodoCollectionWrapper borderColor={color}>
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