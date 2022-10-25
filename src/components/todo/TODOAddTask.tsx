import React, {FC} from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TodoAddTaskBtn } from './styles';
import {useDispatch} from "react-redux";
import {openModal} from "../../store/modalSlice/modalSlice";

interface TodoAddTaskProps {
  title: string;
}

const TodoAddTask: FC<TodoAddTaskProps> = ({title}) => {
  const dispatch = useDispatch()

  const handleAddTask = () => {
    dispatch(openModal({
      modalType: 'create',
      subtype: 'todo',
      modalProps: {title}
    }))
  }

  return (
    <TodoAddTaskBtn onClick={handleAddTask}>
      <AddIcon color="success"/>
    </TodoAddTaskBtn>
  );
};

export default TodoAddTask;