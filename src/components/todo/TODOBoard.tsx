import React, {FC} from 'react';
import {TodoBoardHeader, TodoBoardWrapper} from './styles';
import Typography from "@mui/material/Typography";
import TodoAddTask from "./TODOAddTask";
import TodoTasksCollection from "./TODOTasksCollection";

interface TodoBoardProps {
  title: string;
  color: string;
}

const TodoBoard: FC<TodoBoardProps> = ({title, color}) => {
  return (
    <TodoBoardWrapper borderColor={color}>
      <TodoBoardHeader>
        <Typography variant="h6">
          {title}
        </Typography>
      </TodoBoardHeader>
      <TodoAddTask title={title}/>
      <TodoTasksCollection/>
    </TodoBoardWrapper>
  );
};

export default TodoBoard;