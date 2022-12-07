import React, {FC, useEffect, useState} from 'react';
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Grid from "@mui/material/Grid/Grid";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {TodoCreateModalFormType} from "../../createModals/todoCreateModal/TodoCollectionCreateModal";

interface TodoEditModalProps {
  id: string;
}

const TodoCollectionEditModal: FC<TodoEditModalProps> = ({id}) => {
  const [values, setValues] = useState<TodoCreateModalFormType>({
  titleBoard: '',
  title: '',
  description: ''
})

  useEffect(() => {
  // инициализация полученой по id задачи в values
  }, [])

  const handleType = (event: SelectChangeEvent) => {
    setValues(prevState => ({...prevState, type: event.target.value as string}));
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevState => ({...prevState, title: event.target.value}));
  }

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevState => ({...prevState, description: event.target.value}));
  }

  const handleSave = async () => {
    try {
      // send request to server
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Grid spacing={3} sx={{mb: 2}} container>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Тип</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.titleBoard}
              label="Age"
              onChange={handleType}
            >
              <MenuItem value={'To do'}>To do</MenuItem>
              <MenuItem value={'In progress'}>In progress</MenuItem>
              <MenuItem value={'Completed'}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl sx={{width: 1}}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <OutlinedInput required id="title" label="Title" onChange={handleTitle} value={values.title}/>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{width: 1}}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <OutlinedInput
              multiline required
              id="description"
              label="Description"
              onChange={handleDescription}
              value={values.description}/>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button type={'submit'} onClick={handleSave} variant="outlined">Создать</Button>
      </Box>
    </>
  );
};

export default TodoCollectionEditModal;