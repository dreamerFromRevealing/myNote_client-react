import React, {FC, useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_DOCUMENT, GET_FOLDER, UPDATE_DOCUMENT, UPDATE_FOLDER} from "../../../queries/queries";
import {Grid, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import useHandleReqAlert from "../../../hooks/useHandleReqAlert";

interface EditModalProps {
  id: string;
  isFolder: boolean;
}

const EditModal: FC<EditModalProps> = ({id, isFolder}) => {
  const query = isFolder ? GET_FOLDER : GET_DOCUMENT;
  const mutation = isFolder ? UPDATE_FOLDER : UPDATE_DOCUMENT;
  const {loading, data} = useQuery(query, {variables: {_id: id}})
  const [updateFile] = useMutation(mutation);
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const [values, setValues] = useState<any>({
    title: '',
  })


  useEffect(() => {
    if (!!data) {
      if (isFolder) {
        setValues({
          title: data.folder.title
        })
      } else {
        setValues({
          title: data.document.title
        })
      }
    }
  }, [data])

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      title: event.target.value
    })
  }


  const handleSave = async () => {
    try {
      await updateFile({
        variables: {
          _id: id,
          title: values.title
        }
      })
      callSuccessAlert('Изменения сохранены')
    } catch (e) {
      callErrorAlert('Ошибка при сохранении')
      console.error(e)
    }
  }


  return (
    <div>
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
    </div>
  );
};

export default EditModal;