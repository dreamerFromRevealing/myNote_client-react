import React from 'react';
import {TodoCollectionDeleteBtn, TodoCollectionHeader, TodoCollectionWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";
import {TodoCollectionFuncProps} from "./TodoCollectionFunc";

interface TODOCollectionProps extends TodoCollectionFuncProps{
  handleDelete: () => void
}

const TODOCollection = ({title, color, handleDelete}: TODOCollectionProps) => (
    <TodoCollectionWrapper borderColor={color}>
      <TodoCollectionDeleteBtn onClick={handleDelete}/>
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