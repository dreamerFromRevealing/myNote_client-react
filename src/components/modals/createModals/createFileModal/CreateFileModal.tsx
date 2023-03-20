import Grid from '@mui/material/Grid/Grid';
import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, OutlinedInput} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import useCreateFile from "../../../../hooks/CRUD/useCreateFile";
import Preloader from "../../../layout/items/Preloader";
import {DocumentNode} from "graphql/language";
import {CREATE_NEW_FOLDER} from "../../../../queries/entitis/Folder";
import {CREATE_NEW_DOCUMENT} from "../../../../queries/entitis/Document";
import {CREATE_TODO_BOX} from "../../../../queries/entitis/TodoBox";
import {CREATE_LOGBOOK} from "../../../../queries/entitis/Logbook";
import {CREATE_PROJECT} from "../../../../queries/entitis/Project";

export interface CreateModalProps {
  parentId?: string;
  parentProjectId: string;
  parentType?: string
}

export type CreateModalFormType = {
  title: string;
  type: string;
  parentProjectId: string;
  parentFolderId?: string;
}

const CreateFileModal = ({parentId, parentProjectId, parentType}: CreateModalProps) => {
  const [values, setValues] = useState<CreateModalFormType>({
    title: '',
    type: 'Folder',
    parentProjectId,
    parentFolderId: parentId
  })
  const [mutation, setMutation] = useState<DocumentNode>(CREATE_NEW_FOLDER)

  useEffect(() => {
    switch (values.type) {
      case 'Folder':
        setMutation(CREATE_NEW_FOLDER);
        break;
      case 'Document':
        setMutation(CREATE_NEW_DOCUMENT);
        break;
      case 'TodoBox':
        setMutation(CREATE_TODO_BOX);
        break;
      case 'Logbook':
        setMutation(CREATE_LOGBOOK);
        break;
      case 'ProjectFile':
        setMutation(CREATE_PROJECT);
        break;
    }
  }, [values.type])

  const [createFile, loading] = useCreateFile(mutation, parentProjectId)

  const handleType = (event: SelectChangeEvent) => {
    setValues(prevState => ({...prevState, type: event.target.value as string}));
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevState => ({...prevState, title: event.target.value}));
  }

  const handleSave = async () => {
    try {
      await createFile(values, parentId)
    } catch (e) {
      console.error(e)
    }
  }
  if (loading) return <Preloader/>
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
              <MenuItem value={'Folder'}>Папка</MenuItem>
              <MenuItem value={'Document'}>Документ</MenuItem>
              {parentType === 'ProjectFile' && <MenuItem value={'TodoBox'}>TODO-Box</MenuItem>}
              {parentType === 'ProjectFile' && <MenuItem value={'Logbook'}>Набор журналов</MenuItem>}
              {/*{parentType === 'Folder' && <MenuItem value={'Project'}>Проект</MenuItem>}*/}
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

export default CreateFileModal;