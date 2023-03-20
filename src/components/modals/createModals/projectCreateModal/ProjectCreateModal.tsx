import React, {useState} from 'react';
import useHandleReqAlert from "../../../../hooks/useHandleReqAlert";
import {useMutation} from "@apollo/client";
import {CREATE_WORKSPACE, GET_WORKSPACES} from "../../../../queries/entitis/Workspace";
import Preloader from "../../../layout/items/Preloader";
import {Grid, InputLabel, OutlinedInput} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {CREATE_PROJECT, GET_PROJECTS} from "../../../../queries/entitis/Project";

type ProjectCreateModalFormType = {
  title: string;
}

const ProjectCreateModal = ({parentWorkspaceId}: {parentWorkspaceId: string}) => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const [createProject, {loading}] = useMutation(CREATE_PROJECT,
    {
      refetchQueries: [{query: GET_PROJECTS, variables: {parentWorkspaceId}}]
    });
  const [values, setValues] = useState<ProjectCreateModalFormType>({
    title: '',
  })

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      title: event.target.value
    })
  }

  const handleSave = async () => {
    try {
      await createProject({
        variables: {
          title: values.title,
          parentWorkspaceId
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
        <Button onClick={handleSave} variant="outlined">Создать</Button>
      </Box>
    </>
  );
};

export default ProjectCreateModal;