import React, {useState} from 'react';
import useCreateFile from "../../../../hooks/CRUD/useCreateFile";
import Preloader from "../../../layout/items/Preloader";
import Grid from "@mui/material/Grid/Grid";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {CreateModalProps} from "../createFileModal/CreateFileModal";
import {CREATE_TODO_BOARD} from "../../../../queries/entitis/TodoBoard";

const TodoBoardCreateModal  = ({parentId, parentWorkspaceId}: CreateModalProps) => {
  const [values, setValues] = useState({
    title: '',
    parentTodoBoxId: parentId
  })

  const [createFile, loading] = useCreateFile(CREATE_TODO_BOARD, parentWorkspaceId)

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevState => ({...prevState, title: event.target.value}));
  }

  const handleSave = async () => {
    try {
      await createFile(values)
    } catch (e) {
      console.error(e)
    }
  }
  if (loading) return <Preloader/>
  return (
    <>
      <Grid spacing={3} sx={{mb: 2}} container>
        <Grid item md={6} xs={12}>
          <FormControl sx={{width: 1}}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <OutlinedInput required id="title" label="Title" onChange={handleTitle} value={values.title}/>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button type={'submit'} onClick={handleSave} variant="outlined">Создать</Button>
      </Box>
    </>
  );
};

export default TodoBoardCreateModal;