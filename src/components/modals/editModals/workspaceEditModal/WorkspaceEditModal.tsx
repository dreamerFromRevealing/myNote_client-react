import React, {FC, useEffect, useState} from 'react';
import {Grid, InputLabel, OutlinedInput} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useMutation, useQuery} from "@apollo/client";
import {GET_WORKSPACE, GET_WORKSPACES, UPDATE_WORKSPACE} from "../../../../queries/workspace";
import useHandleReqAlert from "../../../../hooks/useHandleReqAlert";

interface WorkspaceEditModalProps {
  id: string;
}

type WorkspaceEditModalFormType = {
  title: string;
}

const WorkspaceEditModal: FC<WorkspaceEditModalProps> = ({id}) => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const {data} = useQuery(GET_WORKSPACE, {variables: {_id: id}})

  const [updateWorkspace] = useMutation(UPDATE_WORKSPACE,
    {
      refetchQueries: [{query: GET_WORKSPACES}]
    });
  const [values, setValues] = useState<WorkspaceEditModalFormType>({
    title: '',
  })

  useEffect(() => {
    if (!!data) {
      setValues({
        title: data?.workspace?.title
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
      await updateWorkspace({
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

export default WorkspaceEditModal;