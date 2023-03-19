import React, {useEffect, useState} from 'react';
import useHandleReqAlert from "../../../../hooks/useHandleReqAlert";
import {useMutation, useQuery} from "@apollo/client";
import Preloader from "../../../layout/items/Preloader";
import {Grid, InputLabel, OutlinedInput} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {GET_PROJECT, GET_PROJECTS, UPDATE_PROJECT} from "../../../../queries/entitis/Project";

type ProjectEditModalFormType = {
  title: string;
}

const ProjectEditModal = ({id}: {id: string}) => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const {data} = useQuery(GET_PROJECT, {variables: {_id: id}})
console.log('ProjectEditModal data', data, id)
  const [updateProject, {loading}] = useMutation(UPDATE_PROJECT,
    {
      refetchQueries: [{query: GET_PROJECTS, variables: {parentWorkspaceId: data && data.project.parentWorkspaceId._id}}]
    });
  const [values, setValues] = useState<ProjectEditModalFormType>({
    title: '',
  })

  useEffect(() => {
    if (!!data) {
      setValues({
        title: data?.project?.title
      })
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
      await updateProject({
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

export default ProjectEditModal;