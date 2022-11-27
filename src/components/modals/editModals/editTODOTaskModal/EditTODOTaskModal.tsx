import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid/Grid";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useMutation, useQuery} from "@apollo/client";
import {UPDATE_TODO_TASK} from "../../../../queries/treeFiles";
import {GET_TODO_TASK, GET_TODO_TASKS} from "../../../../queries/queries";
import Preloader from "../../../layout/items/Preloader";
import {useDispatch} from "react-redux";
import {openModal} from "../../../../store/modalSlice/modalSlice";

interface EditTODOTaskModalProps {
  parentTodoCollectionId: string
  id: string
}

const EditTODOTaskModal = ({parentTodoCollectionId, id}: EditTODOTaskModalProps) => {
  const {data} = useQuery(GET_TODO_TASK, {variables: {_id: id}})
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    title: '',
    description: '',
    _id: id
  })

  useEffect(() => {
    if (data) {
      setValues(prevState => ({
        ...prevState,
        title: data?.todoTask.title,
        description: data?.todoTask?.description
      }))
    }
  }, [data])

  const [updateTodoTask, {loading}] = useMutation(UPDATE_TODO_TASK, {
    refetchQueries: [{
      query: GET_TODO_TASKS,
      variables: {parentTodoCollectionId}
    }]
  })

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevState => ({...prevState, title: event.target.value}));
  }

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevState => ({...prevState, description: event.target.value}));
  }

  const handleDelete = () => {
    dispatch(openModal({
      modalType: 'delete',
      subtype: 'TodoTask',
      modalProps: {
        id,
        type: 'TodoTask',
        parentId: parentTodoCollectionId,
        name: values.title
      }
    }))
  }

  const handleSave = async () => {
    try {
      await updateTodoTask({variables: values})
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <Preloader/>
  return (
    <>
      <Grid spacing={3} sx={{mb: 2}} container>
        <Grid item xs={6}>
          <FormControl sx={{width: 1}}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <OutlinedInput required id="title" label="Title" onChange={handleTitle} value={values.title}/>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{width: 1}}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <OutlinedInput
              multiline
              id="description"
              label="Description"
              onChange={handleDescription}
              value={values.description}
              rows={4}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button onClick={handleDelete} color="error" variant="outlined">Удалить</Button>
        <Button type={'submit'} onClick={handleSave} variant="outlined">Изменить</Button>
      </Box>
    </>
  );
};

export default EditTODOTaskModal;