import React, {FC, useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_DOCUMENT, GET_FOLDER, UPDATE_DOCUMENT, UPDATE_FOLDER} from "../../../../queries/queries";
import {Grid, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import useHandleReqAlert from "../../../../hooks/useHandleReqAlert";
import {GET_TREE_BY_WORKSPACE_ID} from "../../../../queries/layout";

export interface EditModalProps {
  id: string;
  type: string;
}

const EditFileModal: FC<EditModalProps> = ({id, type}) => {
  const [query, setQuery] = useState<any>({
    query: GET_FOLDER,
    mutation: UPDATE_FOLDER
  });

  const [loadData, {data}] = useLazyQuery(query.query, {variables: {_id: id}})
  const [parentWorkspaceId, setParentWorkspaceId] = useState('')

  useEffect(() => {
    switch (type) {
      case 'Document':
        setQuery({
          query: GET_DOCUMENT,
          mutation: UPDATE_DOCUMENT
        })
        break;
    }

    loadData()
  }, [])

  const [updateFile] = useMutation(query.mutation,
    {
      refetchQueries: [{
        query: GET_TREE_BY_WORKSPACE_ID,
        variables: { parentWorkspaceId: parentWorkspaceId }
      }]
    });
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const [values, setValues] = useState<any>({
    title: '',
  })


  useEffect(() => {
    if (!!data) {
      switch (type) {
        case 'Folder':
          setParentWorkspaceId(data.folder.parentWorkspaceId._id)
          setValues({
            title: data.folder.title
          })
          break;
        case 'Document':
          setParentWorkspaceId(data.document.parentWorkspaceId._id)
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