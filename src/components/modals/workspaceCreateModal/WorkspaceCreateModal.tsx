import React, {useState} from 'react';
import {Grid, InputLabel, OutlinedInput} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useMutation} from "@apollo/client";
import {CREATE_WORKSPACE, GET_WORKSPACES} from "../../../queries/workspace";
import useHandleReqAlert from "../../../hooks/useHandleReqAlert";

type WorkspaceCreateModalFormType = {
  title: string;
}

const WorkspaceCreateModal = () => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const [createWorkspace] = useMutation(CREATE_WORKSPACE,
    {
      refetchQueries: [{query: GET_WORKSPACES}]
    });
  const [values, setValues] = useState<WorkspaceCreateModalFormType>({
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
      await createWorkspace({
        variables: {
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
        <Button onClick={handleSave} variant="outlined">Создать</Button>
      </Box>
    </>
  );
};

export default WorkspaceCreateModal;