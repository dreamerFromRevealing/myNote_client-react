import { CircularProgress } from '@mui/material';
import React from 'react';
import {PreloaderWrapper} from "./styles";

const Preloader = () => {
  return (
    <PreloaderWrapper>
      <CircularProgress />
    </PreloaderWrapper>
  )
};

export default Preloader;