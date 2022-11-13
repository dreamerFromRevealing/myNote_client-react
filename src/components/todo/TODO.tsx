import React from 'react';
import TodoBoard from "./TODOBoard";
import Box from "@mui/material/Box";

const TODO = () => {

  return (
    <Box sx={{p: '10px 10px 0 10px', display: 'flex'}}>
        <TodoBoard color={'#c72828'} title={'To do'}/>
        <TodoBoard color={'#c72828'} title={'In progress'}/>
        <TodoBoard color={'#c72828'} title={'Completed'}/>
        <TodoBoard color={'#c72828'} title={'Completed'}/>
    </Box>
  );
};

export default TODO;