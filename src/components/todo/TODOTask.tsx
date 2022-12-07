import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from "react-redux";
import {openModal} from "../../store/modalSlice/modalSlice";
import Button from "@mui/material/Button";

interface TodoCollectionProps {
  title: string;
  description?: string;
  _id: string;
  parentTodoCollectionId: string;
}

const TodoTask = ({title, _id, description, parentTodoCollectionId}: TodoCollectionProps) => {
  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(openModal({
      modalType: 'edit',
      subtype: 'TodoTask',
      modalProps: {id: _id, parentTodoCollectionId}
    }))
  }

  return (
    <Box sx={{backgroundColor: '#fff', p: 1, mb: 1}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
        <Typography sx={{fontSize: '1.2em'}} variant="subtitle2">
          {title}
        </Typography>
        <Button size="small" onClick={handleEdit}>
          <EditIcon  sx={{ color: '#60226f' }}/>
        </Button>
      </Box>
      <Typography>
        {description}
      </Typography>
    </Box>
  );
};

export default TodoTask;