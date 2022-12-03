import React from 'react';
import {TodoWrapper} from './styles';
import {TODONewCollection} from "./TODONewCollection";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_TODO_COLLECTIONS} from "../../queries/queries";
import Preloader from "../layout/items/Preloader";
import TodoCollectionFunc from "./TodoCollectionFunc";
import {Droppable} from 'react-beautiful-dnd';
import TodoDnDWrapper from "./TODODnDWrapper";

const TODO = () => {
  const {todoId} = useParams();
  const {data, loading} = useQuery(GET_TODO_COLLECTIONS, {
    variables:{parentTodoBoardParentId: todoId}
  })

  if (loading) return <Preloader/>
  return (
    <TodoDnDWrapper todoId={todoId} currentArray={data.todoCollections}>
      <Droppable droppableId="wrapper" type="WRAPPERTodoCollection" direction="horizontal">
        {(provided) => (
          <TodoWrapper ref={provided.innerRef} {...provided.droppableProps}>
            {data.todoCollections && data.todoCollections.map((item: any, index: number) => (
              <TodoCollectionFunc
                key={item._id}
                color={item.color}
                title={item.title}
                parentTodoBoardParentId={todoId || ''}
                id={item._id}
                index={index}
              />
            ))}
            {provided.placeholder}
            <TODONewCollection parentTodoBoardParentId={todoId} countItems={data.todoCollections.length || 0}/>
          </TodoWrapper>
        )}
      </Droppable>
    </TodoDnDWrapper>
  );
};

export default TODO;