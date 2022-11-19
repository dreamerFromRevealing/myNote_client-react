import React from 'react';
import {TodoWrapper} from './styles';
import {TODONewCollection} from "./TODONewCollection";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";
import Preloader from "../layout/items/Preloader";
import TodoCollectionFunc from "./TodoCollectionFunc";

const TODO = () => {
  const {todoId} = useParams();
  const {data, loading} = useQuery(GET_TODO_COLLECTIONS, {
    variables: {
      parentTodoBoardParentId: todoId
    }
  })
  console.log('TODO', data)
  if (loading) return <Preloader/>
  return (
    <TodoWrapper>
      {data?.todoCollections && data.todoCollections.map((item: any, index: number) => (
        <TodoCollectionFunc
          key={'tc' + index}
          color={item.color}
          title={item.title}
          parentTodoBoardParentId={todoId || ''}
          id={item._id}
        />
      ))}
      <TODONewCollection parentTodoBoardParentId={todoId} countItems={data?.todoCollections.length || 0}/>
    </TodoWrapper>
  );
};

export default TODO;