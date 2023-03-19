import React, {FC, useEffect, useState} from 'react';
import {Grid, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Preloader from "../../../layout/items/Preloader";
import useUpdateFile from "../../../../hooks/CRUD/useUpdateFile";

export interface EditModalProps {
  id: string;
  type: string;
  parentProjectId: string;
}

const EditFileModal: FC<EditModalProps> = ({id, type, parentProjectId}) => {
  const [handleUpdate, loading, currentData] = useUpdateFile(id, type, parentProjectId)
  const [values, setValues] = useState<any>({
    title: '',
  })


  useEffect(() => {
    if (!!currentData) {
      const propName = type[0].toLowerCase() + type.slice(1)
      setValues({title: currentData[propName].title})
    }
  }, [currentData])

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      title: event.target.value
    })
  }

  const handleSave = () => {
    handleUpdate(values)
  }


  if (loading) return <Preloader/>

  return (
    <>
      <Grid spacing={3} sx={{mb: 2}} container>
        <Grid item md={6} xs={12}>
          <FormControl sx={{width: 1}}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <OutlinedInput id="title" label="Title" onChange={handleTitle} value={values.title}/>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button onClick={handleSave} variant="outlined">Сохранить</Button>
      </Box>
    </>
  );
};

export default EditFileModal;