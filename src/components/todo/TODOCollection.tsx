import React from 'react';
import {TodoCollectionHeader, TodoCollectionMenuBtn, TodoCollectionWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";
import {TodoCollectionFuncProps} from "./TodoCollectionFunc";
import TodoCollectionMenu from "./TODOCollectionMenu";

interface TODOCollectionProps extends TodoCollectionFuncProps{
  handleDelete: () => void
}

const TODOCollection = ({title, color, handleDelete}: TODOCollectionProps) => (
    <TodoCollectionWrapper borderColor={color}>
      <TodoCollectionMenuBtn>
        <TodoCollectionMenu/>
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