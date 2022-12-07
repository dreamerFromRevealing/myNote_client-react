import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {TodoAddTaskBtn} from './styles';
import {useDispatch} from "react-redux";
import {openModal} from "../../store/modalSlice/modalSlice";

interface TodoAddTaskProps {
  parentTodoCollectionId: string;
  countItems: number;
}

const TodoAddTask = ({parentTodoCollectionId, countItems}: TodoAddTaskProps) => {
  const dispatch = useDispatch()

  const handleAddTask = () => {
    dispatch(openModal({
      modalType: 'create',
      subtype: 'TodoTask',
      modalProps: {
        parentTodoCollectionId,
        countItems
      }
    }))
  }

  return (
    <TodoAddTaskBtn onClick={handleAddTask}>
      <AddIcon color="success"/>
    </TodoAddTaskBtn>
  );
};

export default TodoAddTask;