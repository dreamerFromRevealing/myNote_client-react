import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import {setAlert} from "../../store/appSlice/appSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MainAlert = () => {
  const state = useSelector((state: any) => state.app.alert);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlert({
      show: false,
      message: '',
      type: '',
    }))
  };

  return (
    <Snackbar open={state.show} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={state.type || 'success'} sx={{ width: '100%' }}>
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default MainAlert;