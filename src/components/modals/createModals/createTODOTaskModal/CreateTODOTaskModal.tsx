import React, {useState} from 'react';
import Grid from "@mui/material/Grid/Grid";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useMutation} from "@apollo/client";
import {CREATE_TODO_TASK} from "../../../../queries/treeFiles";
import {GET_TODO_TASKS} from "../../../../queries/queries";
import Preloader from "../../../layout/items/Preloader";

interface CreateTODOTaskModalProps {
  parentTodoCollectionId: string
}

const CreateTodoTaskModal = ({parentTodoCollectionId}: CreateTODOTaskModalProps) => {
  const [values, setValues] = useState({
    title: '',
    parentTodoCollectionId,
    description: ''
  })

  const [createTodoTask, {loading}] = useMutation(CREATE_TODO_TASK, {
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

  const handleSave = async () => {
    try {
      await createTodoTask({variables: values})
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
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button type={'submit'} onClick={handleSave} variant="outlined">Создать</Button>
      </Box>
    </>
  );
};

export default CreateTodoTaskModal;