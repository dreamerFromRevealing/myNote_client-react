import React, {useState} from 'react';
import Grid from "@mui/material/Grid/Grid";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Preloader from "../../../layout/items/Preloader";
import {useMutation} from "@apollo/client";
import {CREATE_TODO_COLLECTION} from "../../../../queries/treeFiles";
import {GET_TODO_COLLECTIONS} from "../../../../queries/queries";
import useHandleReqAlert from "../../../../hooks/useHandleReqAlert";
import {ColorResult, SliderPicker} from "react-color";


const CreateTodoCollectionModal = ({parentTodoBoardParentId}: {parentTodoBoardParentId: string}) => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const [variables, setVariables] = useState({
    title: '',
    color: 'blue',
    parentTodoBoardParentId
  })
  const [createCollection, {loading}] = useMutation(CREATE_TODO_COLLECTION, {
    refetchQueries: [{
      query: GET_TODO_COLLECTIONS,
      variables: {parentTodoBoardParentId}
    }]
  })

  const handleSave = () => {
    createCollection({variables})
      .then(() => callSuccessAlert('TODO коллекция успешно создана!'))
      .catch(err => callErrorAlert('Ошибка создания TODO коллекции', err))
  }

  const handleChangeColorComplete = (color: ColorResult) => {
    setVariables(prevState => ({...prevState, color: color.hex}));
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariables(prevState => ({...prevState, title: event.target.value}));
  }

  if (loading) return <Preloader/>
  return (
    <>
      <Grid spacing={3} sx={{mb: 2}} container>
        <Grid item xs={12}>
            <SliderPicker
              color={variables.color}
              onChange={handleChangeColorComplete}
            />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl sx={{width: 1}}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <OutlinedInput required id="title" label="Title" onChange={handleTitle} value={variables.title}/>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button type={'submit'} onClick={handleSave} variant="outlined">Создать</Button>
      </Box>
    </>
  );
};

export default CreateTodoCollectionModal;