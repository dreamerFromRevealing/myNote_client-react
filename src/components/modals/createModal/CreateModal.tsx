import Grid from '@mui/material/Grid/Grid';
import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, OutlinedInput} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import useCreateFile from "../../../hooks/CRUD/useCreateFile";

interface CreateModalProps {
  parentId?: string;
  parentWorkspaceId: string;
}

type CreateModalFormType = {
  title: string;
  type: string;
}

const CreateModal: FC<CreateModalProps> = ({parentId, parentWorkspaceId}) => {
  const [values, setValues] = useState<CreateModalFormType>({
    title: '',
    type: 'folder'
  })

  const createFile = useCreateFile(parentWorkspaceId)

  const handleType = (event: SelectChangeEvent) => {
    setValues(prevState => ({...prevState, type: event.target.value as string}));
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevState => ({...prevState, title: event.target.value}));
  }

  const handleSave = async () => {
    try {
      await createFile(values.title, values.type, parentId)
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
              value={values.type}
              label="Age"
              onChange={handleType}
            >
              <MenuItem value={'folder'}>Папка</MenuItem>
              <MenuItem value={'default'}>Документ</MenuItem>
              <MenuItem value={'todo'}>TODO</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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

export default CreateModal;