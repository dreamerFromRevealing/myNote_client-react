import React from 'react';
import TodoBoard from "./TODOBoard";
import {TodoWrapper} from './styles';
import {TODONewCollection} from "./TODONewCollection";

const TODO = () => {

  return (
    <TodoWrapper>
      <TodoBoard color={'#c72828'} title={'To do'}/>
      <TodoBoard color={'#c72828'} title={'In progress'}/>
      <TodoBoard color={'#c72828'} title={'Completed'}/>
      <TODONewCollection/>
    </TodoWrapper>
  );
};

export default TODO;