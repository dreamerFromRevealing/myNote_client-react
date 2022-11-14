import React, {useState} from 'react';
import useHandleReqAlert from "../../../../hooks/useHandleReqAlert";
import {useMutation} from "@apollo/client";
import {UPDATE_TODO_COLLECTION} from "../../../../queries/treeFiles";
import {GET_TODO_COLLECTIONS} from "../../../../queries/queries";
import {ColorResult, SliderPicker} from "react-color";
import Preloader from "../../../layout/items/Preloader";
import Grid from "@mui/material/Grid/Grid";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


const TodoCollectionEditModal = ({id, parentId, title, color}: {id: string, parentId: string, title: string, color: string}) => {
  const {callSuccessAlert, callErrorAlert} = useHandleReqAlert()
  const [variables, setVariables] = useState({
    _id: id,
    title,
    color,
    parentTodoBoardParentId: parentId
  })
  const [updateCollection, {loading}] = useMutation(UPDATE_TODO_COLLECTION, {
    refetchQueries: [{
      query: GET_TODO_COLLECTIONS,
      variables: {parentTodoBoardParentId: parentId}
    }]
  })

  const handleSave = () => {
    updateCollection({variables})
      .then(() => callSuccessAlert('TODO коллекция успешно изменена!'))
      .catch(err => callErrorAlert('Ошибка изменения TODO коллекции', err))
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
        <Button type={'submit'} onClick={handleSave} variant="outlined">Изменить</Button>
      </Box>
    </>
  );
};

export default TodoCollectionEditModal;